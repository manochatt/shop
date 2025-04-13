import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateItemDto } from './services/create/dto';
import {
  CreateItemService,
  GetItemService,
  ListItemService,
  ShoppingService,
  UpdateItemService,
} from './services';
import { IdParam, ResponseDto } from 'core/dto';
import { ListItemQuery } from './services/list/dto';
import { UpdateItemDto } from './services/update/dto';
import { ShoppingDto } from './services/shopping/dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('items')
export class ItemController {
  constructor(
    private readonly createItemService: CreateItemService,
    private readonly getItemService: GetItemService,
    private readonly listItemService: ListItemService,
    private readonly shoppingService: ShoppingService,
    private readonly updateItemService: UpdateItemService,
  ) {}

  @ApiOperation({ summary: 'Create item' })
  @Post()
  async create(@Body() dto: CreateItemDto) {
    const data = await this.createItemService.exec(dto);

    return ResponseDto.ok({ data });
  }

  @ApiOperation({ summary: 'Get item by id' })
  @Get(':id')
  async get(@Param() { id }: IdParam) {
    const data = await this.getItemService.exec(id);

    return ResponseDto.ok({ data });
  }

  @ApiOperation({ summary: 'Get all items' })
  @Get()
  async list(@Query() query: ListItemQuery) {
    const { meta, items } = await this.listItemService.exec(query);

    return ResponseDto.ok({ meta, data: items });
  }

  @ApiOperation({ summary: 'Update item' })
  @Patch(':id')
  async update(@Param() { id }: IdParam, @Body() dto: UpdateItemDto) {
    const data = await this.updateItemService.exec(id, dto);

    return ResponseDto.ok({ data });
  }

  @ApiOperation({ summary: 'Calculate the final prize' })
  @Post('shopping')
  async shopping(@Body() dto: ShoppingDto) {
    const data = await this.shoppingService.exec(dto);

    return ResponseDto.ok({ data });
  }
}
