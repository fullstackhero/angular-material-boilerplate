import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Category } from '../../models/category';
import { CategoryParams } from '../../models/categoryParams';
import { CategoryService } from '../../services/category.service';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: PaginatedResult<Category>;
  categoryColumns: TableColumn[];
  categoryParams = new CategoryParams();
  searchString: string;

  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategorys();
    this.initColumns();
  }

  getCategorys(): void {
    this.categoryService
      .getCategories(this.categoryParams)
      .subscribe((result) => {
        this.categories = result;
      });
  }

  initColumns(): void {
    this.categoryColumns = [
      { name: 'Id', dataKey: 'id', isSortable: true, isShowable: true },
      { name: 'Name', dataKey: 'name', isSortable: true, isShowable: true },
      { name: 'Detail', dataKey: 'detail', isSortable: true, isShowable: true },
      { name: 'Action', dataKey: 'action', position: 'right' },
    ];
  }

  pageChanged(event: PaginatedFilter): void {
    this.categoryParams.pageNumber = event.pageNumber;
    this.categoryParams.pageSize = event.pageSize;
    this.getCategorys();
  }

  openForm(category?: Category): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: category,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCategorys();
      }
    });
  }

  remove($event: string): void {
    this.categoryService.deleteCategory($event).subscribe(() => {
      this.getCategorys();
      this.toastr.info('Category Removed');
    });
  }

  sort($event: Sort): void {
    this.categoryParams.orderBy = $event.active + ' ' + $event.direction;
    console.log(this.categoryParams.orderBy);
    this.getCategorys();
  }

  filter($event: string): void {
    this.categoryParams.searchString = $event.trim().toLocaleLowerCase();
    this.categoryParams.pageNumber = 0;
    this.categoryParams.pageSize = 0;
    this.getCategorys();
  }

  reload(): void {
    this.categoryParams.searchString = '';
    this.categoryParams.pageNumber = 0;
    this.categoryParams.pageSize = 0;
    this.getCategorys();
  }
}
