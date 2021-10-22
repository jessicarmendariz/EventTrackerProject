import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8086/';
  private url = this.baseUrl + 'api/books';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('BookService.index(): Error Retrieving Book List');
      })
    );
  }

}
