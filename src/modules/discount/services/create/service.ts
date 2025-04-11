import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto';
import { ErrorException } from 'src/core/exceptions';
import { MongoErrorCode } from 'src/utils/mongoose/mongoose.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Discount, DiscountModel } from 'src/database/discount/schema';

@Injectable()
export class CreateDiscountService {
  constructor(@InjectModel(Discount.name) private discountModel: DiscountModel) {}

  async exec(dto: CreateDiscountDto) {
    try {
      const discount = new this.discountModel(dto);

      await discount.save();

      return discount;
    } catch (error) {
      if (error instanceof ErrorException) throw error;
      if (error.code === MongoErrorCode.DUPLICATE_KEY) {
        const [duplicateKey] = Object.keys(error.keyPattern);

        throw ErrorException.CONFLICT_WITH({ message: `${duplicateKey} already exist` });
      }

      throw ErrorException.INTERNAL_SERVER_ERROR();
    }
  }
}
