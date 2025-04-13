import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ItemCategory } from 'database/item/enum';

export class UpdateItemDto {
  @ApiPropertyOptional({
    description: 'Updated name of the item',
    example: 'New T-shirt',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated category of the item',
    enum: ItemCategory,
    example: ItemCategory.CLOTHING,
  })
  @IsOptional()
  @IsEnum(ItemCategory)
  category?: ItemCategory;

  @ApiPropertyOptional({
    description: 'Updated prize of the item (must be at least 0)',
    example: 25.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  prize?: number;
}
