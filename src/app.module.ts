import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/module';
import { ConfigModule } from '@nestjs/config';
import { environmentConfiguration } from './core/config/env.configuration';
import { ItemController } from './modules/item/controller';
import { itemServices } from './modules/item/services';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(environmentConfiguration)],
  controllers: [ItemController],
  providers: [...itemServices],
})
export class AppModule {}
