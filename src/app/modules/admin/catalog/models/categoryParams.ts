import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';

export class CategoryParams implements PaginatedFilter {
  searchString: string;
  pageNumber: number;
  pageSize: number;
  orderBy: string;
}
