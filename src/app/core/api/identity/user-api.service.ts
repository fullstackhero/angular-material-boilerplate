import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { User } from 'src/app/modules/admin/identity/models/user';
import { UserRole } from 'src/app/modules/admin/identity/models/userRole';
import {environment} from 'src/environments/environment';

@Injectable()
export class UserApiService {

  baseUrl = environment.apiUrl + 'identity/users/';

  constructor(private http: HttpClient) {
  }

  getAlls(params: HttpParams) {
    return this.http.get(this.baseUrl, {params: params});
  }

  getById(id: string) {
    return this.http.get<User>(this.baseUrl + id);
  }

  create(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  update(user: User) {
    return this.http.put(this.baseUrl, user);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }

  getUserRoles(id: string) {
    return this.http.get(this.baseUrl + `roles/${id}`);
  }

  updateUserRoles(id: string, request: UserRole) {
    return this.http.put(this.baseUrl + `roles/${id}`, request);
  }
}
