import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    this.refreshToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>) {
    if (this.authService.isAuthenticated) {
      const localToken = this.authService.getToken;
      request = request.clone({setHeaders: {'Authorization': `Bearer ${localToken}`}});
    }
    return request;
  }

  private refreshToken(request: HttpRequest<any>) {
    if (!request.url.includes('token')) {
      const localToken = this.authService.getToken;
      // if token is null
      if (!(localToken)) {
        return;
      }

      const jwtService = new JwtHelperService();
      const willExpireSoon =
        !jwtService.isTokenExpired(localToken) &&
        jwtService.isTokenExpired(localToken, 10 * 60);
      if (willExpireSoon) {
        this.authService.tryRefreshingToken();
      }
    }
  }
}
