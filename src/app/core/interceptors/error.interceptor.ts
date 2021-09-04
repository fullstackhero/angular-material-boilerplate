import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        switch (response.error.errorCode) {
          case 400:
            if (response.error.messages) {
              this.toastr.error(response.error.exception);
            }
            else {
              this.toastr.error(response.error.exception);
            }
            break;
          case 401:
            this.toastr.error('Authentication Failure', response.error.exception);
            this.authService.logout();
            break;
          case 403:
            this.toastr.error(response.error.exception);
            break;
          case 404:
            this.toastr.error('Not Found!', response.error.exception);
            //this.router.navigateByUrl('/not-found');
            break;
          case 500:
            this.toastr.error('Something Went Wrong', response.error.exception);
            break;
          default:
            if (response.status === 0) {
              this.toastr.error('Unable to Connect to fluentPOS Server.', response.error.exception);
              break;
            }
            this.toastr.error('Something Went Wrong', response.error.exception);
            break;
        }
        return throwError(response.error);
      })
    );
  }
}
