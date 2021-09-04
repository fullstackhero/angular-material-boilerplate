import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomAction } from 'src/app/core/shared/components/table/custom-action';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { User } from '../../../models/user';
import { UserRoleModel } from '../../../models/userRole';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-role-form',
  templateUrl: './user-role-form.component.html',
  styleUrls: ['./user-role-form.component.scss']
})
export class UserRoleFormComponent implements OnInit {
  userRoles: UserRoleModel[];
  userRoleColumns: TableColumn[];
  searchString: string;
  userRoleActionData: CustomAction = new CustomAction('Update User Roles', 'update', 'primary');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialog,
    public userService: UserService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.initColumns();
  }

  getUsers(): void {
    this.userService.getUserRoles(this.data.id).subscribe((result) => {
      this.userRoles = result.data.userRoles;
    });
  }

  initColumns(): void {
    this.userRoleColumns = [
      { name: 'RoleId', dataKey: 'roleId', isSortable: true, isShowable: true },
      { name: 'RoleName', dataKey: 'roleName', isSortable: true, isShowable: true },
      { name: 'Selected', dataKey: 'selected', isSortable: true, isShowable: true },
    ];
  }

  submitUserRoles($event): void{
    this.userService.updateUserRoles(this.data.id, { userRoles: $event}).subscribe((result) => {
      this.toastr.success(result.messages[0]);
      this.dialogRef.closeAll();
    });
  }
}
