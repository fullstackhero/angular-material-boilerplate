import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../../models/brand';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {
  brandForm: FormGroup;
  formTitle: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Brand, private dialogRef: MatDialog, private brandService: BrandService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.brandForm = this.fb.group({
      id: [this.data && this.data.id],
      name: [this.data && this.data.name, Validators.required],
      detail: [this.data && this.data.detail, Validators.required]
    })
    if (this.brandForm.get('id').value === "" || this.brandForm.get('id').value == null) {
      this.formTitle = "Register Brand";
    }
    else {
      this.formTitle = "Edit Brand";
    }
  }

  onSubmit() {
    if (this.brandForm.valid) {
      if (this.brandForm.get('id').value === "" || this.brandForm.get('id').value == null) {
        this.brandService.createBrand(this.brandForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
          this.dialogRef.closeAll();
        })
      } else {
        this.brandService.updateBrand(this.brandForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
          this.dialogRef.closeAll();
        })
      }
    }
  }

}
