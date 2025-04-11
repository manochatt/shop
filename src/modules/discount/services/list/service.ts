import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Discount, DiscountModel } from 'src/database/discount/schema';
import { ListDiscountQuery } from './dto';
import { FilterQuery } from 'mongoose';
import { RegExpr } from 'src/utils/helpers/regex';

@Injectable()
export class ListDiscountService {
  constructor(@InjectModel(Discount.name) private discountModel: DiscountModel) {}

  async exec(listDiscountQuery: ListDiscountQuery) {
    const { limit, offset } = listDiscountQuery;
    const filterQuery = this.buildQuery(listDiscountQuery);
    const total = await this.discountModel.countDocuments(filterQuery);
    const meta = { offset, limit, total };

    if (!total) return { meta, discounts: [] };

    const discounts = await this.discountModel
      .find(filterQuery)
      .sort({ category: 1, _id: 1 })
      .skip(offset)
      .limit(limit);

    return { meta, discounts };
  }

  private buildQuery({ code, categories }: ListDiscountQuery) {
    const query: FilterQuery<Discount> = {};

    if (code) query.code = { $regex: RegExpr.fromString(code, 'i') };
    if (categories) query.category = { $in: categories };

    return query;
  }
}
