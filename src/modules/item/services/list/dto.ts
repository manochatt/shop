import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, Validate } from 'class-validator';
import { ItemCategory } from 'src/database/item/enum';
import { IsEnums } from 'src/utils/decorators/dto.decorator';
import { PaginationQuery } from 'src/utils/models/pagination.model';
import { PrizeRangeValidator } from 'src/utils/validators/prize-range.validator';

export class ListItemQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEnums(ItemCategory)
  categories?: ItemCategory[];

  @IsOptional()
  @IsNumber()
  @Validate(PrizeRangeValidator)
  minPrize?: number;

  @IsOptional()
  @IsNumber()
  @Validate(PrizeRangeValidator)
  maxPrize?: number;
}
