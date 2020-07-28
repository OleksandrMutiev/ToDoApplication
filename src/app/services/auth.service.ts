import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpService,
    private cookieService: CookieService,
  ) {}

  public isAuthenticated(): boolean {
    return !!this.cookieService.get('connect.sid');
  }

  public register(user: User): Observable<any> {
    return this.http.post('/users/register', user);
  }

  public login(user: User): Observable<any> {
    return this.http.post('/auth/login', user);
  }

  public logout(): Observable<any> {
    return this.http.get(`/auth/logout`);
  }
}
