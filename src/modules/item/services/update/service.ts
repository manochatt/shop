import { Injectable } from '@nestjs/common';
import { Item, ItemModel } from 'src/database/item/schema';
import { UpdateItemDto } from './dto';
import { ErrorException } from 'src/core/exceptions';
import { MongoErrorCode } from 'src/utils/mongoose/mongoose.enum';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UpdateItemService {
  constructor(@InjectModel(Item.name) private itemModel: ItemModel) {}

  async exec(id: string, dto: UpdateItemDto) {
    try {
      const item = await this.itemModel.findById(id);
      if (!item) throw ErrorException.NOT_FOUND_WITH({ message: `Not found item with ID: ${id}` });

      item.set(dto);

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
