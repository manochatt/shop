import { Prop, Schema, SchemaOptions } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export import ObjectId = Types.ObjectId;

export const BaseSchema = (options?: SchemaOptions) =>
  Schema({ minimize: true, versionKey: false, timestamps: true, ...options });

export const EmbeddedSchema = (options?: SchemaOptions) =>
  Schema({ _id: false, versionKey: false, ...options });

export const ObjectIdProp = (ref: { ref: string } | { refPath: string }) =>
  Prop({ type: SchemaTypes.ObjectId, ...ref });

export const ArrayOfObjectIdsProp = (ref: { ref: string } | { refPath: string }) =>
  Prop({ type: [SchemaTypes.ObjectId], default: [], ...ref });
