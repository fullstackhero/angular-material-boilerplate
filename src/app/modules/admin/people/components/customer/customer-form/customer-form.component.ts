import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../../../models/customer';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  formTitle: string;
  customerTypes: string[] = ['General', 'VIP'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Customer, private customerService: CustomerService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.customerForm = this.fb.group({
      id: [this.data && this.data.id],
      name: [this.data && this.data.name, Validators.required],
      phone: [this.data && this.data.phone, Validators.required],
      email: [this.data && this.data.email, [Validators.required, Validators.email]],
      imageUrl: [this.data && this.data.imageUrl],
      type: [this.data && this.data.type, Validators.required]
    })

    if (this.customerForm.get('id').value === "" || this.customerForm.get('id').value == null) {
      this.formTitle = "Register Customer";
    }
    else {
      this.formTitle = "Edit Customer";
    }
  }

  onSubmit() {
    console.log(this.customerForm.value);
    if (this.customerForm.valid) {
      if (this.customerForm.get('id').value === "" || this.customerForm.get('id').value == null) {
        this.customerService.createCustomer(this.customerForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
        })
      } else {
        this.customerService.updateCustomer(this.customerForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
        })
      }
    }
  }

  getSelectedCustomerType(type: string) {
    return this.customerTypes.find(x => x.match(type));
  }

}
