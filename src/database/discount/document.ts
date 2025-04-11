import { Prop } from '@nestjs/mongoose';
import { BaseSchema } from '../model';
import { DiscountCategory, DiscountType } from './enum';
import { ItemCategory } from '../item/enum';

@BaseSchema()
export class DiscountDocument {
  @Prop({ unique: true })
  code: string;

  @Prop()
  value: number;

  @Prop()
  type: DiscountType;

  @Prop()
  category: DiscountCategory;

  @Prop()
  itemCategory?: ItemCategory;

  @Prop()
  minAmount?: number;
}
