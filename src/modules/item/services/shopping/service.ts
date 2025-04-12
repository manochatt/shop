import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Discount, DiscountModel } from 'src/database/discount/schema';
import { Item, ItemModel } from 'src/database/item/schema';
import { ShoppingDto } from './dto';
import { Types } from 'mongoose';
import { DiscountCategory, DiscountType } from 'src/database/discount/enum';
import { ShoppingResponse } from './response';

const MAX_USED_POINT_PERCENT = 20;

@Injectable()
export class ShoppingService {
  constructor(
    @InjectModel(Discount.name) private discountModel: DiscountModel,
    @InjectModel(Item.name) private itemModel: ItemModel,
  ) {}

  async exec(dto: ShoppingDto): Promise<ShoppingResponse> {
    const { itemIds, discountCode, point } = dto;

    const ids = itemIds.map((id) => new Types.ObjectId(id));
    const items = await this.itemModel.find({ _id: { $in: ids } });
    if (!items.length) return { totalAmount: 0, finalAmount: 0 };

    const { amountSummary, totalAmount } = this.amountSummary(items);

    let finalAmount = totalAmount;
    finalAmount = await this.discountByCoupon(amountSummary, finalAmount, discountCode);
    finalAmount = await this.discountByOntop(amountSummary, finalAmount, point);
    finalAmount = await this.discountBySeasonal(finalAmount);

    return { totalAmount, finalAmount: Number(finalAmount.toFixed(2)) };
  }

  // Get amount summary by category
  private amountSummary(items: Item[]) {
    return items.reduce(
      (acc, curr) => {
        const { category, prize } = curr;
        acc.totalAmount += prize;
        acc.amountSummary[category] = (acc.amountSummary[category] || 0) + prize;

        return acc;
      },
      { amountSummary: {} as Record<string, number>, totalAmount: 0 as number },
    );
  }

  // Discount amount by coupon
  private async discountByCoupon(
    amountSummary: Record<string, number>,
    totalAmount: number,
    discountCode?: string,
  ) {
    if (!discountCode) return totalAmount;

    const coupon = await this.discountModel.findOne({
      code: discountCode,
      category: DiscountCategory.COUPON,
    });
    if (!coupon) return totalAmount;

    let newTotalAmount = 0;
    for (const [key, value] of Object.entries(amountSummary)) {
      amountSummary[key] =
        coupon.type === DiscountType.PERCENT
          ? value * ((100 - coupon.value) / 100)
          : value - (value / totalAmount) * coupon.value;
      newTotalAmount += amountSummary[key];
    }

    return newTotalAmount;
  }

  // Discount amount by on-top
  private async discountByOntop(
    amountSummary: Record<string, number>,
    totalAmount: number,
    point?: number,
  ) {
    if (Boolean(point)) {
      const maxPointUsed =
        point > totalAmount * (MAX_USED_POINT_PERCENT / 100)
          ? totalAmount * (MAX_USED_POINT_PERCENT / 100)
          : point;
      return totalAmount - maxPointUsed;
    }

    let newTotalAmount = 0;
    for (const [key, value] of Object.entries(amountSummary)) {
      const onTop = await this.discountModel.findOne({
        category: DiscountCategory.ON_TOP,
        itemCategory: key,
      });
      if (!onTop) {
        newTotalAmount += amountSummary[key];

        continue;
      }

      amountSummary[key] = (value * (100 - onTop.value)) / 100;
      newTotalAmount += amountSummary[key];
    }
    return newTotalAmount;
  }

  // Discount amount by seasonal
  private async discountBySeasonal(totalAmount: number) {
    const seasonal = await this.discountModel.findOne({
      category: DiscountCategory.SEASONAL,
      minAmount: { $exists: true },
    });
    if (!seasonal) return totalAmount;

    const discountAmount = Math.floor(totalAmount / seasonal.minAmount) * seasonal.value;
    return totalAmount - discountAmount;
  }
}
