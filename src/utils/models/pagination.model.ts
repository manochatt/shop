import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

enum SortOrder {
  ASC = 'asc',
  ASCENDING = 'ascending',
  DESC = 'desc',
  DESCENDING = 'descending',
}

export class SortQuery {
  @IsOptional()
  @IsString()
  @Type(() => String)
  sort?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  @Type(() => String)
  order?: SortOrder;
}

export class PaginationQuery extends SortQuery {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1000)
  @Type(() => Number)
  limit = Number(process.env.PAGINATION_DEFAULT_LIMIT);

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  offset = Number(process.env.PAGINATION_DEFAULT_OFFSET);
}

export class PipeLineStageOptions {
  limit?: number;
  offset?: number;
  sort?: Record<string, 1 | -1>;
}
