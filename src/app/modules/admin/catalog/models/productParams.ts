import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';

export class ProductParams implements PaginatedFilter {
  searchString: string;
  brandId: number;
  categoryId: number;
  pageNumber: number;
  pageSize: number;
  orderBy: string;
}
