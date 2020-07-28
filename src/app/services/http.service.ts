import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {
  options = { headers: new HttpHeaders(), withCredentials: true };
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(url: string, options?): Observable<any> {
    return this.http
      .get(this.urlConstructor(url), { ...this.options, ...options })
      .pipe(catchError(this.handleError));
  }

  post(url: string, value: any, options?): Observable<any> {
    return this.http
      .post(this.urlConstructor(url), value, { ...this.options, ...options })
      .pipe(catchError(this.handleError));
  }

  put(url: string, value: any, options?): Observable<any> {
    return this.http
      .put(this.urlConstructor(url), value, { ...this.options, ...options })
      .pipe(catchError(this.handleError));
  }

  delete(url: string): Observable<any> {
    return this.http
      .delete(this.urlConstructor(url), this.options)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
    } else {
      console.error(
        `Backend returned code ${err.status}, body was:`,
        err.error,
      );
    }

    const modError = {
      ...err.error,
      status: err.status,
      'retry-after': err.headers.get('retry-after'),
    };
    return of(modError);
  }

  private urlConstructor(endpoint) {
    return this.apiUrl + endpoint;
  }
}
