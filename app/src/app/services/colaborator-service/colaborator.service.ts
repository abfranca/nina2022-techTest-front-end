import { Injectable } from '@angular/core';
import { Colaborator } from '../../models/colaborator';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ColaboratorService {

  private colaboratorsUrl = 'http://localhost:3000/colaborators';

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

  getColaborators(): Observable<Colaborator[]> {
    return this.http.get<Colaborator[]>(this.colaboratorsUrl)
      .pipe(
        catchError(this.handleError<Colaborator[]>('getColaborators', []))
      );
  }

  getColaborator(id: number): Observable<Colaborator> {
    return this.http.get<Colaborator>(`${this.colaboratorsUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Colaborator>(`getColaborator id=${id}`))
      );
  }

  updateColaborator(colaborator: Colaborator): Observable<any> {
    return this.http.put(`${this.colaboratorsUrl}/${colaborator.id}`, colaborator, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateColaborator'))
      );
  }

  createColaborator(colaborator: object): Observable<any> {
    return this.http.post(this.colaboratorsUrl, colaborator, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('createColaborator'))
      );
  }

  constructor(
    private http: HttpClient
  ) { }
}
