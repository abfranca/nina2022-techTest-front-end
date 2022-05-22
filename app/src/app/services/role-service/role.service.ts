import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/role';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  private rolesUrl = 'http://localhost:3000/roles';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl)
      .pipe(
        catchError(this.handleError<Role[]>('getRoles', []))
      );
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.rolesUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Role>(`getRole id=${id}`))
      );
  }

  constructor(
    private http: HttpClient
  ) { }
}
