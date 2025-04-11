import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Discount, DiscountModel } from 'src/database/discount/schema';

@Injectable()
export class DeleteDiscountService {
  constructor(@InjectModel(Discount.name) private discountModel: DiscountModel) {}

  async exec(id: string) {
    await this.discountModel.findByIdAndDelete(id);
  }
}
