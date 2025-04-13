import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DiscountCategory } from 'database/discount/enum';
import { IsEnums } from 'utils/decorators/dto.decorator';
import { PaginationQuery } from 'utils/models/pagination.model';

export class ListDiscountQuery extends PaginationQuery {
  @ApiPropertyOptional({
    description: 'Filter discounts by code (partial match)',
    example: 'WINTER25',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @ApiPropertyOptional({
    description: 'Filter by one or more discount categories',
    isArray: true,
    enum: DiscountCategory,
    example: [DiscountCategory.SEASONAL, DiscountCategory.ON_TOP],
  })
  @IsOptional()
  @IsEnums(DiscountCategory)
  categories?: DiscountCategory[];
}
