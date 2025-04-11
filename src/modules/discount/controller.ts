import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateDiscountService,
  DeleteDiscountService,
  GetDiscountService,
  ListDiscountService,
} from './services';
import { CreateDiscountDto } from './services/create/dto';
import { IdParam, ResponseDto } from 'src/core/dto';
import { ListDiscountQuery } from './services/list/dto';

@Controller('discounts')
export class DiscountController {
  constructor(
    private readonly createDiscountService: CreateDiscountService,
    private readonly deleteDiscountService: DeleteDiscountService,
    private readonly getDiscountService: GetDiscountService,
    private readonly listDiscountService: ListDiscountService,
  ) {}

  @Post()
  async create(@Body() dto: CreateDiscountDto) {
    const data = await this.createDiscountService.exec(dto);

    return ResponseDto.ok({ data });
  }

  @Get(':id')
  async get(@Param() { id }: IdParam) {
    const data = await this.getDiscountService.exec(id);

    return ResponseDto.ok({ data });
  }

  @Get()
  async list(@Query() query: ListDiscountQuery) {
    const { meta, discounts } = await this.listDiscountService.exec(query);

    return ResponseDto.ok({ meta, data: discounts });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { id }: IdParam) {
    await this.deleteDiscountService.exec(id);
  }
}
