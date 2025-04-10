import { Model, Schema } from 'mongoose';
import { ItemDocument } from './document';
import { AsyncModelFactory, SchemaFactory } from '@nestjs/mongoose';

export abstract class Item extends ItemDocument {}

export type ItemModel = Model<Item>;

type InstanceMethods = Omit<Item, keyof ItemDocument>;

export const ItemModelFactory: AsyncModelFactory = {
  name: Item.name,
  useFactory: () => {
    const schema = SchemaFactory.createForClass(ItemDocument) as Schema<
      ItemDocument,
      ItemModel,
      InstanceMethods
    >;

    return schema;
  },
};
