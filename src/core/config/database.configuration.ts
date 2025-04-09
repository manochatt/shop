import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getDatabaseFactory = (): MongooseModuleOptions => ({
  uri: process.env.MONGO_URL!,
});
