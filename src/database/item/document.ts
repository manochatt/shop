import { Prop } from '@nestjs/mongoose';
import { ItemCategory } from './enum';
import { BaseSchema } from '../model';

@BaseSchema()
export class ItemDocument {
  @Prop({ unique: true, sparse: true })
  name: string;

  @Prop()
  category: ItemCategory;

  @Prop()
  prize: number;
}
