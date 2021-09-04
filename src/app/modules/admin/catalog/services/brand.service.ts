import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BrandApiService } from 'src/app/core/api/catalog/brand-api.service';
import { IResult } from 'src/app/core/models/wrappers/IResult';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Brand } from '../models/brand';
import { BrandParams } from '../models/brandParams';

@Injectable()
export class BrandService {
  constructor(private api: BrandApiService) {}

  getBrands(brandParams: BrandParams): Observable<PaginatedResult<Brand>> {
    let params = new HttpParams();
    if (brandParams.searchString)
      params = params.append('searchString', brandParams.searchString);
    if (brandParams.pageNumber)
      params = params.append('pageNumber', brandParams.pageNumber.toString());
    if (brandParams.pageSize)
      params = params.append('pageSize', brandParams.pageSize.toString());
    if (brandParams.orderBy)
      params = params.append('orderBy', brandParams.orderBy.toString());
    return this.api
      .getAlls(params)
      .pipe(map((response: PaginatedResult<Brand>) => response));
  }

  getBrandById(id: string): Observable<Brand> {
    return this.api.getById(id).pipe(map((response: Brand) => response));
  }

  createBrand(brand: Brand): Observable<IResult<Brand>> {
    return this.api
      .create(brand)
      .pipe(map((response: IResult<Brand>) => response));
  }

  updateBrand(brand: Brand): Observable<IResult<Brand>> {
    return this.api
      .update(brand)
      .pipe(map((response: IResult<Brand>) => response));
  }

  deleteBrand(id: string): Observable<IResult<string>> {
    return this.api
      .delete(id)
      .pipe(map((response: IResult<string>) => response));
  }
}
