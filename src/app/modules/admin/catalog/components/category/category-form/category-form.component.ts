import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  formTitle: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Category, private categoryService: CategoryService, private toastr: ToastrService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.categoryForm = this.fb.group({
      id: [this.data && this.data.id],
      name: [this.data && this.data.name, Validators.required],
      detail: [this.data && this.data.detail, Validators.required]
    });
    if (this.categoryForm.get('id').value === '' || this.categoryForm.get('id').value == null) {
      this.formTitle = 'Register Category';
    } else {
      this.formTitle = 'Edit Category';
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.categoryForm.get('id').value === '' || this.categoryForm.get('id').value == null) {
        this.categoryService.createCategory(this.categoryForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
        });
      } else {
        this.categoryService.updateCategory(this.categoryForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
        });
      }
    }
  }

}
