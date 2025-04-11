import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './database/module';
import { ConfigModule } from '@nestjs/config';
import { environmentConfiguration } from './core/config/env.configuration';
import { ItemController } from './modules/item/controller';
import { itemServices } from './modules/item/services';
import { DiscountController } from './modules/discount/controller';
import { discountServices } from './modules/discount/services';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(environmentConfiguration)],
  controllers: [DiscountController, ItemController],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true, whitelist: true }) },
    ...discountServices,
    ...itemServices,
  ],
})
export class AppModule {}
