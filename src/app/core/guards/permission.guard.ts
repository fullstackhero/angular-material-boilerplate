import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const allowedPermissions = route.data.allowedPermissions;
    const isAuthorized = this.authService.isAuthorized('Permission', allowedPermissions);

    if (!isAuthorized) {
      this.toastrService.warning("You are not authoroized to access the resource");
      this.router.navigateByUrl('access-denial');
    }

    return isAuthorized;
  }
  
}
