import { CreateItemService } from './create/service';
import { GetItemService } from './get/service';
import { ListItemService } from './list/service';
import { ShoppingService } from './shopping/service';
import { UpdateItemService } from './update/service';

export { CreateItemService, GetItemService, ListItemService, UpdateItemService, ShoppingService };

export const itemServices = [
  CreateItemService,
  GetItemService,
  ListItemService,
  UpdateItemService,
  ShoppingService,
];
