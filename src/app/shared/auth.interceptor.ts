import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalService } from '../services/global.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private contentType: string;
  get user(): string {
    return this.globalService.user_id;
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.headers.has('Content-Type')) {
      this.contentType = req.headers.get('Content-Type');
    }
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          'Content-Type': this.contentType || 'application/json',
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout().subscribe(({ success }) => {
            if (success) {
              this.router.navigate(['/login']);
            }
          });
        }
        return throwError(error);
      }),
    );
  }
}
