import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [PermissionGuard],
    data: {
      allowedPermissions: ['Permissions.Users.View']
    }
  },
  {
    path: 'roles',
    component: RoleComponent,
    canActivate: [PermissionGuard],
    data: {
      allowedPermissions: ['Permissions.Roles.View']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
