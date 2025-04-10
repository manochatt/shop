import { Injectable } from '@nestjs/common';
import { ListItemQuery } from './dto';
import { FilterQuery } from 'mongoose';
import { Item, ItemModel } from 'src/database/item/schema';
import { RegExpr } from 'src/utils/helpers/regex';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ListItemService {
  constructor(@InjectModel(Item.name) private itemModel: ItemModel) {}

  async exec(listItemQuery: ListItemQuery) {
    const { limit, offset } = listItemQuery;
    const filterQuery = this.buildQuery(listItemQuery);
    const total = await this.itemModel.countDocuments(filterQuery);
    const meta = { offset, limit, total };

    if (!total) return { meta, items: [] };

    const items = await this.itemModel
      .find(filterQuery)
      .sort({ category: 1, prize: 1, _id: 1 })
      .skip(offset)
      .limit(limit);

    return { meta, items };
  }

  private buildQuery({ name, categories, minPrize, maxPrize }: ListItemQuery) {
    const query: FilterQuery<Item> = {};

    if (name) query.name = { $regex: RegExpr.fromString(name, 'i') };
    if (categories) query.category = { $in: categories };
    if (minPrize) query.prize = { $gte: minPrize };
    if (maxPrize) query.prize = { ...query.prize, $lte: maxPrize };

    return query;
  }
}
