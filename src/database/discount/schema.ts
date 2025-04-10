import { Model, Schema } from 'mongoose';
import { AsyncModelFactory, SchemaFactory } from '@nestjs/mongoose';
import { DiscountDocument } from './document';

export abstract class Discount extends DiscountDocument {}

export type DiscountModel = Model<Discount>;

type InstanceMethods = Omit<Discount, keyof DiscountDocument>;

export const DiscountModelFactory: AsyncModelFactory = {
  name: Discount.name,
  useFactory: () => {
    const schema = SchemaFactory.createForClass(DiscountDocument) as Schema<
      DiscountDocument,
      DiscountModel,
      InstanceMethods
    >;

    return schema;
  },
};
