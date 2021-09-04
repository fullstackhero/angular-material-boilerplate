import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Permission } from 'src/app/modules/admin/identity/models/permission';
import { Role } from 'src/app/modules/admin/identity/models/role';
import {environment} from 'src/environments/environment';

@Injectable()
export class RoleApiService {

  baseUrl = environment.apiUrl + 'identity/roles/';

  constructor(private http: HttpClient) {
  }

  getAlls(params: HttpParams) {
    return this.http.get(this.baseUrl, {params: params});
  }

  getById(id: string) {
    return this.http.get<Role>(this.baseUrl + id);
  }

  create(role: Role) {
    return this.http.post(this.baseUrl, role);
  }

  update(role: Role) {
    return this.http.post(this.baseUrl, role);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }

  getPermissions(roleId: string) {
    return this.http.get(this.baseUrl + `permissions/byrole/${roleId}`);
  }

  updateRolePermissions(request: Permission) {
    return this.http.put(this.baseUrl + 'permissions/update', request);
  }

  getAllClaims() {
    return this.http.get(this.baseUrl + `permissions`)
  }

  getClaim(id: number) {
    return this.http.get(this.baseUrl + `permissions/${id}`);
  }

  deleteClaim(id: number) {
    return this.http.delete(this.baseUrl + `permissions/${id}`)
  }

}
