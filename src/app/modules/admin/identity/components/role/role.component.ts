import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Role } from '../../models/role';
import { RoleParams } from '../../models/roleParams';
import { RoleService } from '../../services/role.service';
import { RoleFormComponent } from './role-form/role-form.component';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { RolePermissionFormComponent } from './role-permission-form/role-permission-form.component';
import { CustomAction } from 'src/app/core/shared/components/table/custom-action';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  roles: PaginatedResult<Role>;
  roleColumns: TableColumn[];
  roleParams = new RoleParams();
  searchString: string;
  permissionActionData: CustomAction = new CustomAction('Manage Permissions');

  constructor(
    public roleService: RoleService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.initColumns();
  }

  getRoles(): void {
    this.roleService.getRoles(this.roleParams).subscribe((result) => {
      this.roles = result;
    });
  }

  initColumns(): void {
    this.roleColumns = [
      { name: 'Id', dataKey: 'id', isSortable: true, isShowable: true },
      { name: 'Name', dataKey: 'name', isSortable: true, isShowable: true },
      { name: 'Description', dataKey: 'description', isSortable: true, isShowable: true },
      { name: 'Action', dataKey: 'action', position: 'right' },
    ];
  }

  pageChanged(event: PaginatedFilter): void {
    this.roleParams.pageNumber = event.pageNumber;
    this.roleParams.pageSize = event.pageSize;
    this.getRoles();
  }

  openPermissionsForm(role: Role): void {
    const dialogRef = this.dialog.open(RolePermissionFormComponent, {
      data: role,
      panelClass: 'mat-dialog-container-no-padding'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoles();
      }
    });
  }

  openForm(role?: Role): void {
    const dialogRef = this.dialog.open(RoleFormComponent, {
      data: role
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRoles();
      }
    });
  }

  remove($event: string): void {
    this.roleService.deleteRole($event).subscribe(() => {
      this.getRoles();
      this.toastr.info('Role Removed');
    });
  }

  sort($event: Sort): void {
    this.roleParams.orderBy = $event.active + ' ' + $event.direction;
    console.log(this.roleParams.orderBy);
    this.getRoles();
  }

  filter($event: string): void {
    this.roleParams.searchString = $event.trim().toLocaleLowerCase();
    this.roleParams.pageNumber = 0;
    this.roleParams.pageSize = 0;
    this.getRoles();
  }

  reload(): void {
    this.roleParams.searchString = '';
    this.roleParams.pageNumber = 0;
    this.roleParams.pageSize = 0;
    this.getRoles();
  }
}
