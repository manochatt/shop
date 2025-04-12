import {
  ArrayNotEmpty,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ShoppingDto {
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  itemIds: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  discountCode?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  point?: number;
}
