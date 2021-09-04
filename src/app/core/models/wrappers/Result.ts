import { IResult } from "./IResult";

export class Result<T> implements IResult<T>
{
    succeeded: boolean;
    messages: string[];
    data: T;
    source: string;
    exception: string;
    errorCode: number;

}
