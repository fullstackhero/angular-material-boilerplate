import { PaginatedFilter } from "src/app/core/models/Filters/PaginatedFilter";

export class CustomerParams implements PaginatedFilter {
    searchString: string;
    pageNumber: number;
    pageSize: number;
    orderBy: string;
}
