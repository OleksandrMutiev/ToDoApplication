import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTabsModule,
} from '@angular/material';
import { GlobalService } from './services/global.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { SpinnerInterceptor } from './shared/spinner.interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

const INTERCEPTOR_SPINNER = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: SpinnerInterceptor,
};

@NgModule({
  declarations: [AppComponent, LayoutComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    HttpService,
    GlobalService,
    CookieService,
    INTERCEPTOR_PROVIDER,
    INTERCEPTOR_SPINNER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
