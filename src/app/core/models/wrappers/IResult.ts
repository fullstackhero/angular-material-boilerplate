export interface IResult<T>
{
  succeeded: boolean;
  messages: string[];
  data: T | T[];
}