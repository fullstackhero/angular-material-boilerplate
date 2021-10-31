import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';

export class BrandParams implements PaginatedFilter {
  keyword: string;
  pageNumber: number;
  pageSize: number;
  orderBy: string;
}
