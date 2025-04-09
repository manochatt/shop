import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getDatabaseFactory } from 'src/core/config/database.configuration';

@Module({
  imports: [MongooseModule.forRootAsync({ useFactory: getDatabaseFactory })],
  exports: [MongooseModule],
})
export class DatabaseModule {}
