import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DiscountCategory } from 'src/database/discount/enum';
import { IsEnums } from 'src/utils/decorators/dto.decorator';
import { PaginationQuery } from 'src/utils/models/pagination.model';

export class ListDiscountQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @IsOptional()
  @IsEnums(DiscountCategory)
  categories?: DiscountCategory[];
}
