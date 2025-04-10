import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorException } from 'src/core/exceptions';
import { Item, ItemModel } from 'src/database/item/schema';
import { ObjectId } from 'src/database/model';

@Injectable()
export class GetItemService {
  constructor(@InjectModel(Item.name) private itemModel: ItemModel) {}

  async exec(id: string) {
    const item = await this.itemModel.findById(id);

    if (!item) throw ErrorException.NOT_FOUND_WITH({ message: `Not found item with ID: ${id}` });

    return item;
  }
}
