import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItemApiModel } from '../../models/cart/cart-item';
import { Result } from '../../models/wrappers/Result';

@Injectable({
  providedIn: 'root'
})
export class CartItemsApiService {
  baseUrl = environment.apiUrl + 'people/cartitems/';
  constructor(private http: HttpClient) {
  }
  get(cartId: string) {
    let params = new HttpParams();
    params = params.append('cartId', cartId);
    return this.http.get<Result<CartItemApiModel[]>>(this.baseUrl, { params: params });
  }
  create(cartItem: CartItemApiModel) {
    return this.http.post<Result<string>>(this.baseUrl, cartItem);
  }

  update(cartItem: CartItemApiModel) {
    return this.http.put<Result<string>>(this.baseUrl, cartItem);
  }
  delete(id: string) {
    return this.http.delete<Result<string>>(this.baseUrl + id);
  }
}
