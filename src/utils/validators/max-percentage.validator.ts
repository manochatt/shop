import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DiscountType } from 'database/discount/enum';

@ValidatorConstraint()
export class MaxPercentageValidator implements ValidatorConstraintInterface {
  private message: string;

  validate(_: unknown, { constraints, object }: ValidationArguments) {
    const { valueConstraint = 'value', typeConstraint = 'type' } = constraints?.[0] ?? {};

    this.message = `${valueConstraint} of percent can not be greater than 100`;

    const { [typeConstraint]: type, [valueConstraint]: value } = object as Record<string, any>;

    if (type === DiscountType.PERCENT) return value <= 100;

    return true;
  }

  defaultMessage() {
    return this.message;
  }
}
