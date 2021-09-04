import { PaginatedFilter } from "src/app/core/models/Filters/PaginatedFilter";

export class EventLogParams implements PaginatedFilter {
    orderBy: string;
    searchString: string;
    pageNumber: number;
    pageSize: number;
}
