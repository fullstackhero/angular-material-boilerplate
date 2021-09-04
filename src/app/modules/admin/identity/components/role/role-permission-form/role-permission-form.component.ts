import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomAction } from 'src/app/core/shared/components/table/custom-action';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { Permission, RoleClaim } from '../../../models/permission';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-role-permission-form',
  templateUrl: './role-permission-form.component.html',
  styleUrls: ['./role-permission-form.component.scss']
})
export class RolePermissionFormComponent implements OnInit {
  rolePermission: Permission;
  rolePermissionColumns: TableColumn[];
  rolePermissionGroup: string[];
  searchString: string;
  rolePermissionActionData: CustomAction = new CustomAction('Update Permission', 'update', 'primary');

  groupRoleClaims: Record<string, RoleClaim[]> = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Role,
    private dialogRef: MatDialog,
    public roleService: RoleService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPermissions();
    this.initColumns();
  }

  getPermissions(): void {
    this.roleService.getRolePermissionsByRoleId(this.data.id).subscribe((result) => {
      this.rolePermission = result.data;
      this.rolePermissionGroup = [...new Set(result.data.roleClaims.map(item => item.group))];
      this.rolePermission.roleClaims.forEach(claim => {
        if (Object.keys(this.groupRoleClaims).find(key => key === claim.group)){
          this.groupRoleClaims[claim.group].push(claim);
        } else {
          this.groupRoleClaims[claim.group] = [claim];
        }
      });
    });
  }

  initColumns(): void {
    this.rolePermissionColumns = [
      // { name: 'Id', dataKey: 'id', isSortable: true, isShowable: true },
      { name: 'Type', dataKey: 'type', isSortable: true, isShowable: true },
      { name: 'Group', dataKey: 'group', isSortable: true, isShowable: true },
      { name: 'Value', dataKey: 'value', isSortable: true, isShowable: true },
      { name: 'Description', dataKey: 'description', isSortable: true, isShowable: true },
      { name: 'Selected', dataKey: 'selected', isSortable: true, isShowable: true },
    ];
  }

  getSelectedCount(roleClaims: RoleClaim[]): number{
    return roleClaims.filter(claim => claim.selected).length;
  }

  getGroupBadgeColor(selected: number, all: number): string {
    if (selected == 0)
        return "warn";
    if (selected == all)
        return "accent";
    return "primary";
  }

  submitRolePermission(): void{
    var selectedRoleClaims = [];
    Object.entries(this.groupRoleClaims).forEach(([key, value]) => {
      value.forEach(claim => {
        if (claim.selected){
          selectedRoleClaims.push(claim);
        }
      });
    });
    this.roleService.updateRolePermissions({roleId: this.data.id, roleClaims: selectedRoleClaims}).subscribe((result) => {
      this.toastr.success(result.messages[0]);
      this.dialogRef.closeAll();
    });
  }
}
