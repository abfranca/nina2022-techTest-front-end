import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})

export class AccessControlService {

  private usersUrl = 'http://localhost:3000/users';
  private users: User[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(email: string, password: string): Observable<boolean> {
    return of(this.users.filter(user => user.email == email && user.password == password).length == 1);
  }

  changePassword(userEmail: string, oldPassword: string, newPassword: string): Observable<boolean> {
    var returnedUsers = this.users.filter(user => user.email == userEmail && user.password == oldPassword);
    if (returnedUsers.length == 1) {
      var userUpdated = returnedUsers[0];
      userUpdated.password = newPassword;
      this.http.put(`${this.usersUrl}/${userUpdated.id}`, userUpdated, this.httpOptions)
        .subscribe(() => this.preLogin());
      return of(true);
    } else {
      return of(false);
    }
  }

  preLogin(): void {
    this.http.get<User[]>(this.usersUrl)
      .subscribe(users => this.users = users);
  }

  constructor(
    private http: HttpClient
  ) { }
}
