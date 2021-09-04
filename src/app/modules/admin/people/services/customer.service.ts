import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerApiService } from 'src/app/core/api/people/customer-api.service';
import { IResult } from 'src/app/core/models/wrappers/IResult';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { Result } from 'src/app/core/models/wrappers/Result';
import { Customer } from '../models/customer';
import { CustomerParams } from '../models/customerParams';

@Injectable()
export class CustomerService {

  constructor(private api: CustomerApiService){
  }

  getCustomers(CustomerParams: CustomerParams): Observable<PaginatedResult<Customer>> {
    let params = new HttpParams();
    if (CustomerParams.searchString) params = params.append('searchString', CustomerParams.searchString);
    if (CustomerParams.pageNumber) params = params.append('pageNumber', CustomerParams.pageNumber.toString());
    if (CustomerParams.pageSize) params = params.append('pageSize', CustomerParams.pageSize.toString());
    if (CustomerParams.orderBy) params = params.append('orderBy', CustomerParams.orderBy.toString());
    return this.api.getAlls(params)
      .pipe(map((response: PaginatedResult<Customer>) => response));
  }

  getCustomerById(id: string): Observable<Result<Customer>> {
    return this.api.getById(id).pipe(
      map((response: Result<Customer>) => response)
    );
  }

  createCustomer(Customer: Customer): Observable<IResult<Customer>> {
    return this.api.create(Customer).pipe(
      map((response: IResult<Customer>) => response)
    );
  }

  updateCustomer(Customer: Customer): Observable<IResult<Customer>> {
    return this.api.update(Customer).pipe(
      map((response: IResult<Customer>) => response)
    );
  }

  deleteCustomer(id: string): Observable<IResult<string>> {
    return this.api.delete(id).pipe(
      map((response: IResult<string>) => response)
    );
  }
}
