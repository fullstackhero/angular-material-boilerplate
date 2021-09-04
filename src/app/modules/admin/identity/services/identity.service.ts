import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityApiService } from 'src/app/core/api/identity/identity-api.service';
import { IResult } from 'src/app/core/models/wrappers/IResult';
import { ConfirmEmailParams, ConfirmPhoneNumberParams } from '../models/identityParams';
import { ResetPassword } from '../models/resetPassword';
import { User } from '../models/user';

@Injectable()
export class IdentityService {

  constructor(private api: IdentityApiService) { }

  registerUser(user: User): Observable<IResult<string>> {
    return this.api
      .register(user)
      .pipe(map((response: IResult<string>) => response));
  }

  confirmEmail(confirmEmailParams: ConfirmEmailParams): Observable<IResult<string>> {
    let params = new HttpParams();
    if (confirmEmailParams.userId)
      params = params.append('userId', confirmEmailParams.userId);
    if (confirmEmailParams.code)
      params = params.append('code', confirmEmailParams.code);
    
    return this.api
      .confirmEmail(params)
      .pipe(map((response: IResult<string>) => response));
  }

  confirmPhoneNumber(confirmPhoneNumber: ConfirmPhoneNumberParams): Observable<IResult<string>> {
    let params = new HttpParams();
    if (confirmPhoneNumber.userId)
      params = params.append('userId', confirmPhoneNumber.userId);
    if (confirmPhoneNumber.code)
      params = params.append('code', confirmPhoneNumber.code);
    
    return this.api
      .confirmEmail(params)
      .pipe(map((response: IResult<string>) => response));
  }

  forgotPassword(email: string) {
    return this.api
    .forgotPassword(email)
    .pipe(map((response: IResult<string>) => response));
  }

  resetPassword(resetPassword: ResetPassword) {
    return this.api
        .resetPassword(resetPassword)
        .pipe(map((response: IResult<string>) => response));
  }
}
