import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min, Validate, ValidateIf } from 'class-validator';
import { DiscountCategory, DiscountType } from 'database/discount/enum';
import { ItemCategory } from 'database/item/enum';
import { DiscountTypeValidator } from 'utils/validators/discount-type.validator';
import { MaxPercentageValidator } from 'utils/validators/max-percentage.validator';

export class CreateDiscountDto {
  @ApiProperty({
    description: 'Discount code (must be unique)',
    example: 'WINTER25',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description:
      'Discount value. If type is PERCENT, value must be ≤ 100 (validated by MaxPercentageValidator)',
    example: 25,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Validate(MaxPercentageValidator)
  value: number;

  @ApiProperty({
    description:
      'ON_TOP must be PERCENT type, SEASONAL must be AMOUNT type and COUPON can be both type.',
    enum: DiscountType,
    example: DiscountType.PERCENT,
  })
  @IsEnum(DiscountType)
  @Validate(DiscountTypeValidator)
  type: DiscountType;

  @ApiProperty({
    description: 'Discount category (e.g., ON_TOP, SEASONAL)',
    enum: DiscountCategory,
    example: DiscountCategory.ON_TOP,
  })
  @IsEnum(DiscountCategory)
  category: DiscountCategory;

  @ApiPropertyOptional({
    description: 'Required if category is ON_TOP. Target item category for this discount.',
    enum: ItemCategory,
    example: ItemCategory.CLOTHING,
  })
  @ValidateIf(({ category }: CreateDiscountDto) => category === DiscountCategory.ON_TOP)
  @IsEnum(ItemCategory)
  itemCategory?: ItemCategory;

  @ApiPropertyOptional({
    description:
      'Required if category is SEASONAL. Minimum purchase amount required to apply the discount.',
    example: 100,
    minimum: 0,
  })
  @ValidateIf(({ category }: CreateDiscountDto) => category === DiscountCategory.SEASONAL)
  @IsNumber()
  @Min(0)
  minAmount?: number;
}
