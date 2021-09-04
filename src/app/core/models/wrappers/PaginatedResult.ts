import { IResult } from "./IResult";
export class PaginatedResult<T> implements IResult<T>
{
    succeeded: boolean;
    messages: string[];
    data: T[];
    source: string;
    exception: string;
    errorCode: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}
