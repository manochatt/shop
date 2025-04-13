import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { ItemCategory } from 'database/item/enum';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsEnum(ItemCategory)
  category: ItemCategory;

  @IsNumber()
  @Min(0)
  prize: number;
}
