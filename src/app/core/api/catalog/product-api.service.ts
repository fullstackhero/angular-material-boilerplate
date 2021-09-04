import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Product } from 'src/app/modules/admin/catalog/models/product';
import {environment} from 'src/environments/environment';
import { Result } from '../../models/wrappers/Result';

@Injectable()
export class ProductApiService {

  baseUrl = environment.apiUrl + 'catalog/products/';

  constructor(private http: HttpClient) {
  }

  getAlls(params: HttpParams) {
    return this.http.get(this.baseUrl, {params: params});
  }

  getById(id: string) {
    return this.http.get<Result<Product>>(this.baseUrl + id);
  }

  getImageById(id: string) {
    return this.http.get(this.baseUrl + `image/${id}`);
  }

  create(product: Product) {
    return this.http.post(this.baseUrl, product);
  }

  update(product: Product) {
    return this.http.put(this.baseUrl, product);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
