import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional, IsString, Validate } from 'class-validator';
import { ItemCategory } from 'database/item/enum';
import { IsEnums } from 'utils/decorators/dto.decorator';
import { PaginationQuery } from 'utils/models/pagination.model';
import { PrizeRangeValidator } from 'utils/validators/prize-range.validator';

export class ListItemQuery extends PaginationQuery {
  @ApiPropertyOptional({
    description: 'Filter items by name (partial match)',
    example: 'T-shirt',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by categories (comma-separated values)',
    enum: ItemCategory,
    isArray: true,
    example: [ItemCategory.CLOTHING, ItemCategory.ACCESSORIES],
  })
  @IsOptional()
  @IsEnums(ItemCategory)
  categories?: ItemCategory[];

  @ApiPropertyOptional({
    description: 'Minimum prize (as number string), must be >= 0',
    example: '10',
  })
  @IsOptional()
  @IsNumberString()
  @Validate(PrizeRangeValidator)
  minPrize?: number;

  @ApiPropertyOptional({
    description: 'Maximum prize (as number string), must be >= minPrize',
    example: '100',
  })
  @IsOptional()
  @IsNumberString()
  @Validate(PrizeRangeValidator)
  maxPrize?: number;
}
