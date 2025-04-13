import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorException } from 'core/exceptions';
import { Item, ItemModel } from 'database/item/schema';

@Injectable()
export class GetItemService {
  constructor(@InjectModel(Item.name) private itemModel: ItemModel) {}

  async exec(id: string) {
    const item = await this.itemModel.findById(id);

    if (!item) throw ErrorException.NOT_FOUND_WITH({ message: `Not found item with ID: ${id}` });

    return item;
  }
}
