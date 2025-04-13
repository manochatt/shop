import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getDatabaseFactory } from 'core/config/database.configuration';
import { ItemModelFactory } from './item/schema';
import { DiscountModelFactory } from './discount/schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({ useFactory: getDatabaseFactory }),
    MongooseModule.forFeatureAsync([DiscountModelFactory, ItemModelFactory]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
