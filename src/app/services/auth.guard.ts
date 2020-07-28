import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  get user(): string {
    return this.globalService.user_id;
  }
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.authService.logout().subscribe(({ success }) => {
        if (success) {
          this.router.navigate(['/', 'login']);
        }
      });
    }
  }
}
