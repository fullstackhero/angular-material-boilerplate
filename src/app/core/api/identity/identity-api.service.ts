import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { ResetPassword } from 'src/app/modules/admin/identity/models/resetPassword';
import { User } from 'src/app/modules/admin/identity/models/user';
import {environment} from 'src/environments/environment';

@Injectable()
export class IdentityApiService {

  baseUrl = environment.apiUrl + 'identity/';

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  confirmEmail(params: HttpParams) {
    return this.http.get(this.baseUrl + 'confirm-email', {params: params});
  }

  confirmPhoneNumber(params: HttpParams) {
    return this.http.get(this.baseUrl + 'confirm-phone-number', {params: params});
  }

  forgotPassword(email: string) {
    return this.http.post(this.baseUrl + 'forgot-password', email);
  }

  resetPassword(resetPassword: ResetPassword) {
    return this.http.post(this.baseUrl + 'reset-password', resetPassword);
  }
}
