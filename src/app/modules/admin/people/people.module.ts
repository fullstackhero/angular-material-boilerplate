import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { CustomerComponent } from './components/customer/customer.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { CustomerService } from './services/customer.service';
import { CustomerFormComponent } from './components/customer/customer-form/customer-form.component';
import { PeopleComponent } from './people.component';


@NgModule({
  declarations: [
    CustomerComponent,
    SupplierComponent,
    CustomerFormComponent,
    PeopleComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    CustomerService,
  ]
})
export class PeopleModule { }
