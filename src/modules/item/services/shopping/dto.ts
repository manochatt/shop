import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Array of item IDs to be purchased (MongoDB ObjectIds)',
    type: [String],
    example: ['605c72ef9b1e8b3d2c4b7f87', '605c72ef9b1e8b3d2c4b7f88'],
  })
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  itemIds: string[];

  @ApiPropertyOptional({
    description: 'Discount code (optional)',
    example: 'SUMMER2025',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  discountCode?: string;

  @ApiPropertyOptional({
    description: 'Points to redeem (optional, must be ≥ 0)',
    example: 20,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  point?: number;
}
