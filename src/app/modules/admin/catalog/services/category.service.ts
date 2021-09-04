import { Injectable } from '@angular/core';
import { CategoryParams } from '../models/categoryParams';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../../../core/models/wrappers/PaginatedResult';
import { Category } from '../models/category';
import { HttpParams } from '@angular/common/http';
import { IResult } from '../../../../core/models/wrappers/IResult';
import { CategoryApiService } from 'src/app/core/api/catalog/category-api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  constructor(private api: CategoryApiService) {}

  getCategories(
    categoryParams: CategoryParams
  ): Observable<PaginatedResult<Category>> {
    let params = new HttpParams();
    if (categoryParams.searchString) {
      params = params.append('searchString', categoryParams.searchString);
    }
    if (categoryParams.pageNumber) {
      params = params.append(
        'pageNumber',
        categoryParams.pageNumber.toString()
      );
    }
    if (categoryParams.pageSize) {
      params = params.append('pageSize', categoryParams.pageSize.toString());
    }
    if (categoryParams.orderBy) {
      params = params.append('orderBy', categoryParams.orderBy.toString());
    }
    return this.api
      .getAlls(params)
      .pipe(map((response: PaginatedResult<Category>) => response));
  }

  getCategoryById(id: string): Observable<Category> {
    return this.api.getById(id).pipe(map((response: Category) => response));
  }

  createCategory(category: Category): Observable<IResult<Category>> {
    return this.api
      .create(category)
      .pipe(map((response: IResult<Category>) => response));
  }

  updateCategory(category: Category): Observable<IResult<Category>> {
    return this.api
      .update(category)
      .pipe(map((response: IResult<Category>) => response));
  }

  deleteCategory(id: string): Observable<IResult<string>> {
    return this.api
      .delete(id)
      .pipe(map((response: IResult<string>) => response));
  }
}
