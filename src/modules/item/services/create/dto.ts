import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { ItemCategory } from 'database/item/enum';

export class CreateItemDto {
  @ApiProperty({
    description: 'Name of the item',
    example: 'T-shirt',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Category of the item',
    enum: ItemCategory,
    example: ItemCategory.CLOTHING,
  })
  @IsEnum(ItemCategory)
  category: ItemCategory;

  @ApiProperty({
    description: 'Price of the item (must be at least 0)',
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  prize: number;
}
