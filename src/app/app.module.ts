import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './core/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ToolbarComponent } from './layouts/admin-layout/toolbar/toolbar.component';
import { CatalogRoutingModule } from './modules/admin/catalog/catalog-routing.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { SharedModule } from './core/shared/shared.module';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {AuthGuard} from './core/guards/auth.guard';
import {AuthService} from './core/services/auth.service';
import {LocalStorageService} from './core/services/local-storage.service';
import {MultilingualService} from './core/services/multilingual.service';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { BusyService } from './core/services/busy.service';
import { PermissionGuard } from './core/guards/permission.guard';
import { RoleGuard } from './core/guards/role.guard';
import { DatePipe } from '@angular/common';
import { CustomerService } from './modules/admin/people/services/customer.service';

export function rootLoaderFactory(http: HttpClient)
{
  return new TranslateHttpLoader(http,'assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ToolbarComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    CatalogRoutingModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:rootLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [
    AuthGuard,
    PermissionGuard,
    RoleGuard,
    AuthService,
    LocalStorageService,
    MultilingualService,
    BusyService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
