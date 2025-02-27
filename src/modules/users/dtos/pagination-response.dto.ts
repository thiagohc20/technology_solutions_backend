export class PaginationResponseDto<T> {
  readonly data: T[];
  readonly total: number;
  readonly page: number | undefined;
  readonly limit: number | undefined;
}
