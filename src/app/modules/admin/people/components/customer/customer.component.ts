import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Customer } from '../../models/customer';
import { CustomerParams } from '../../models/customerParams';
import { CustomerService } from '../../services/customer.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customers: PaginatedResult<Customer>;
  customerColumns: TableColumn[];
  customerParams = new CustomerParams();
  searchString: string;

  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.initColumns();
  }

  getCustomers(): void {
    this.customerService.getCustomers(this.customerParams).subscribe((result) => {
      this.customers = result;
    });
  }

  initColumns(): void {
    this.customerColumns = [
      { name: 'Id', dataKey: 'id', isSortable: true, isShowable: true },
      { name: 'Name', dataKey: 'name', isSortable: true, isShowable: true },
      { name: 'Phone', dataKey: 'phone', isSortable: true, isShowable: true },
      { name: 'Email', dataKey: 'email', isSortable: true, isShowable: true },
      { name: 'Type', dataKey: 'type', isSortable: true, isShowable: true },
      { name: 'Action', dataKey: 'action', position: 'right' },
    ];
  }

  pageChanged(event: PaginatedFilter): void {
    this.customerParams.pageNumber = event.pageNumber;
    this.customerParams.pageSize = event.pageSize;
    this.getCustomers();
  }

  openForm(customer?: Customer): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      data: customer,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCustomers();
      }
    });
  }

  remove($event: string): void {
    this.customerService.deleteCustomer($event).subscribe(() => {
      this.getCustomers();
      this.toastr.info('Customer Removed');
    });
  }

  sort($event: Sort): void {
    this.customerParams.orderBy = $event.active + ' ' + $event.direction;
    console.log(this.customerParams.orderBy);
    this.getCustomers();
  }

  filter($event: string): void {
    this.customerParams.searchString = $event.trim().toLocaleLowerCase();
    this.customerParams.pageNumber = 0;
    this.customerParams.pageSize = 0;
    this.getCustomers();
  }

  reload(): void {
    this.customerParams.searchString = '';
    this.customerParams.pageNumber = 0;
    this.customerParams.pageSize = 0;
    this.getCustomers();
  }
}
