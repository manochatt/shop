import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorException } from 'src/core/exceptions';
import { Discount, DiscountModel } from 'src/database/discount/schema';

@Injectable()
export class GetDiscountService {
  constructor(@InjectModel(Discount.name) private discountModel: DiscountModel) {}

  async exec(id: string) {
    const discount = await this.discountModel.findById(id);

    if (!discount)
      throw ErrorException.NOT_FOUND_WITH({ message: `Not found discount with ID: ${id}` });

    return discount;
  }
}
