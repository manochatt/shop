import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DiscountCategory } from 'database/discount/enum';
import { IsEnums } from 'utils/decorators/dto.decorator';
import { PaginationQuery } from 'utils/models/pagination.model';

export class ListDiscountQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @IsOptional()
  @IsEnums(DiscountCategory)
  categories?: DiscountCategory[];
}
