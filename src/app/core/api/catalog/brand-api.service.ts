import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Brand } from 'src/app/modules/admin/catalog/models/brand';
import {environment} from 'src/environments/environment';

@Injectable()
export class BrandApiService {

  baseUrl = environment.apiUrl + 'catalog/brands/';

  constructor(private http: HttpClient) {
  }

  getAlls(params: HttpParams) {
    return this.http.get(this.baseUrl, {params: params});
  }

  getById(id: string) {
    return this.http.get<Brand>(this.baseUrl + id);
  }

  create(brand: Brand) {
    return this.http.post(this.baseUrl, brand);
  }

  update(brand: Brand) {
    return this.http.put(this.baseUrl, brand);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
