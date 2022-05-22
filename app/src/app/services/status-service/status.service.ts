import { Injectable } from '@angular/core';
import { Status } from 'src/app/models/status';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StatusService {

  private statusUrl = 'http://localhost:3000/status';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl)
      .pipe(
        catchError(this.handleError<Status[]>('getStatuses', []))
      );
  }

  getStatus(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.statusUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Status>(`getStatus id=${id}`))
      );
  }

  constructor(
    private http: HttpClient
  ) { }
}
