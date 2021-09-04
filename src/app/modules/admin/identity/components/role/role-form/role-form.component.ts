import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  roleForm: FormGroup;
  formTitle: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Role, private roleService: RoleService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.roleForm = this.fb.group({
      id: [this.data && this.data.id],
      name: [this.data && this.data.name, Validators.required],
      description: [this.data && this.data.description, Validators.required]
    })
    if (this.roleForm.get('id').value === "" || this.roleForm.get('id').value == null) {
      this.formTitle = "Register Role";
    }
    else {
      this.formTitle = "Edit Role";
    }
  }

  onSubmit() {
    if (this.roleForm.valid) {
      if (this.roleForm.get('id').value === "" || this.roleForm.get('id').value == null) {
        this.roleService.createRole(this.roleForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
        })
      } else {
        this.roleService.updateRole(this.roleForm.value).subscribe(response => {
          this.toastr.success(response.messages[0]);
        })
      }
    }
  }

}
