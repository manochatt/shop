import { TransformFnParams } from 'class-transformer';
import { isBooleanString, isString } from 'class-validator';

export const booleanStringToBoolean = ({ value }: TransformFnParams) => {
  if (!isBooleanString(value)) return value;

  return value === 'true';
};

export const stringToArrayOfStrings = ({ value }: TransformFnParams) => {
  if (!isString(value)) return value;

  return value.split(',');
};
