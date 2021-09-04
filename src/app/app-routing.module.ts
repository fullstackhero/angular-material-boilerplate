import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AccessDenialComponent } from './core/shared/components/access-denial/access-denial.component';
import { NotFoundComponent } from './core/shared/components/not-found/not-found.component';
import { ServerErrorComponent } from './core/shared/components/server-error/server-error.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
    data: {
      allowedRoles: ['SuperAdmin']
    }
  },
  {
    path: 'access-denial', component: AccessDenialComponent
  },
  {
    path: 'not-found', component: NotFoundComponent
  },
  {
    path: 'server-error', component: ServerErrorComponent
  },
  {
    path: '**', redirectTo: 'not-found', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
