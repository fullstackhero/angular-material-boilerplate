import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PermissionGuard } from 'src/app/core/guards/permission.guard';
import {BrandComponent} from './components/brand/brand.component';
import {CategoryComponent} from './components/category/category.component';
import {ProductComponent} from './components/product/product.component';

const routes: Routes = [
  {
    path: 'brands',
    component: BrandComponent,
    canActivate: [PermissionGuard],
    data: {
      allowedPermissions: ['Permissions.Brands.View']
    }
  },
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      allowedPermissions: ['Permissions.Categories.View']
    }
  },
  {
    path: 'products',
    component: ProductComponent,
    canActivate: [PermissionGuard],
    data: {
      allowedPermissions: ['Permissions.Products.View']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {
}
