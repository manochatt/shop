import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemModel } from 'src/database/item/schema';
import { CreateItemDto } from './dto';
import { ErrorException } from 'src/core/exceptions';
import { MongoErrorCode } from 'src/utils/mongoose/mongoose.enum';

@Injectable()
export class CreateItemService {
  constructor(@InjectModel(Item.name) private itemModel: ItemModel) {}

  async exec(dto: CreateItemDto) {
    try {
      const item = new this.itemModel(dto);

      await item.save();

      return item;
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
