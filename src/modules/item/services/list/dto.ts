import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { ItemCategory } from 'database/item/enum';
import { IsEnums } from 'utils/decorators/dto.decorator';
import { PaginationQuery } from 'utils/models/pagination.model';
import { PrizeRangeValidator } from 'utils/validators/prize-range.validator';

export class ListItemQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEnums(ItemCategory)
  categories?: ItemCategory[];

  @IsOptional()
  @IsNumberString()
  @Validate(PrizeRangeValidator)
  minPrize?: number;

  @IsOptional()
  @IsNumberString()
  @Validate(PrizeRangeValidator)
  maxPrize?: number;
}
