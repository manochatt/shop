import { CreateDiscountService } from './create/service';
import { DeleteDiscountService } from './delete/service';
import { GetDiscountService } from './get/service';
import { ListDiscountService } from './list/service';

export { CreateDiscountService, DeleteDiscountService, GetDiscountService, ListDiscountService };

export const discountServices = [
  CreateDiscountService,
  DeleteDiscountService,
  GetDiscountService,
  ListDiscountService,
];
