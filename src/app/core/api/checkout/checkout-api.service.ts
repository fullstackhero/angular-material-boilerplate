import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Result } from '../../models/wrappers/Result';

@Injectable({
  providedIn: 'root'
})
export class CheckoutApiService {

  baseUrl = environment.apiUrl + 'sales/orders/';

  constructor(private http: HttpClient) {
  }
  submitOrder(cartId: string) {
    return this.http.post<Result<string>>(this.baseUrl, { "cartId": cartId });
  }
}
