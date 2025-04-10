import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { stringToArrayOfStrings } from '../transformers';

export const IsEnums = (entity: object) => {
  return applyDecorators(IsEnum(entity, { each: true }), Transform(stringToArrayOfStrings));
};
