import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';

export class UserParams implements PaginatedFilter {
  searchString: string;
  pageNumber: number;
  pageSize: number;
  orderBy: string;
}
