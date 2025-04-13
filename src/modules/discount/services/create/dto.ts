import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  Validate,
  ValidateIf,
} from 'class-validator';
import { DiscountCategory, DiscountType } from 'database/discount/enum';
import { ItemCategory } from 'database/item/enum';
import { DiscountTypeValidator } from 'utils/validators/discount-type.validator';
import { MaxPercentageValidator } from 'utils/validators/max-percentage.validator';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @Min(0)
  @Validate(MaxPercentageValidator)
  value: number;

  @IsEnum(DiscountType)
  @Validate(DiscountTypeValidator)
  type: DiscountType;

  @IsEnum(DiscountCategory)
  category: DiscountCategory;

  @ValidateIf(({ category }: CreateDiscountDto) => category === DiscountCategory.ON_TOP)
  @IsEnum(ItemCategory)
  itemCategory?: ItemCategory;

  @ValidateIf(({ category }: CreateDiscountDto) => category === DiscountCategory.SEASONAL)
  @IsNumber()
  @Min(0)
  minAmount?: number;
}
