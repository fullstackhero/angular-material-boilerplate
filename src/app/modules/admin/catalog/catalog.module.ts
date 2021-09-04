import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CatalogRoutingModule} from './catalog-routing.module';
import {CatalogComponent} from './catalog.component';
import {BrandComponent} from './components/brand/brand.component';
import {ProductComponent} from './components/product/product.component';
import {CategoryComponent} from './components/category/category.component';
import {MaterialModule} from 'src/app/core/material/material.module';
import {SharedModule} from 'src/app/core/shared/shared.module';
import {BrandFormComponent} from './components/brand/brand-form/brand-form.component';
import {CategoryFormComponent} from './components/category/category-form/category-form.component';
import {ProductFormComponent} from './components/product/product-form/product-form.component';
import {BrandService} from './services/brand.service';
import {CategoryService} from './services/category.service';
import {ProductService} from './services/product.service';


@NgModule({
  declarations: [
    CatalogComponent,
    BrandComponent,
    ProductComponent,
    CategoryComponent,
    BrandFormComponent,
    CategoryFormComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    BrandService, CategoryService, ProductService
  ]
})
export class CatalogModule {
}
