import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateItemDto } from './services/create/dto';
import { CreateItemService, GetItemService, ListItemService, UpdateItemService } from './services';
import { IdParam, ResponseDto } from 'src/core/dto';
import { ListItemQuery } from './services/list/dto';
import { UpdateItemDto } from './services/update/dto';

@Controller('items')
export class ItemController {
  constructor(
    private readonly createItemService: CreateItemService,
    private readonly getItemService: GetItemService,
    private readonly listItemService: ListItemService,
    private readonly updateItemService: UpdateItemService,
  ) {}

  @Post()
  async create(@Body() dto: CreateItemDto) {
    const data = await this.createItemService.exec(dto);

    return ResponseDto.ok({ data });
  }

  @Get(':id')
  async get(@Param() { id }: IdParam) {
    const data = await this.getItemService.exec(id);

    return ResponseDto.ok({ data });
  }

  @Get()
  async list(@Query() query: ListItemQuery) {
    const { meta, items } = await this.listItemService.exec(query);

    return ResponseDto.ok({ meta, data: items });
  }

  @Patch(':id')
  async update(@Param() { id }: IdParam, @Body() dto: UpdateItemDto) {
    const data = await this.updateItemService.exec(id, dto);

    return ResponseDto.ok({ data });
  }
}
