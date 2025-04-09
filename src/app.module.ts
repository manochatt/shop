import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/module';
import { ConfigModule } from '@nestjs/config';
import { environmentConfiguration } from './core/config/env.configuration';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(environmentConfiguration)],
  controllers: [],
  providers: [],
})
export class AppModule {}
