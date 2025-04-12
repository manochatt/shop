import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DiscountCategory, DiscountType } from 'src/database/discount/enum';

@ValidatorConstraint()
export class DiscountTypeValidator implements ValidatorConstraintInterface {
  private message: string;

  validate(_: unknown, { constraints, object }: ValidationArguments) {
    const { categoryConstraint = 'category', typeConstraint = 'type' } = constraints?.[0] ?? {};

    this.message = `${typeConstraint} is not valid with ${categoryConstraint}`;

    const { [typeConstraint]: type, [categoryConstraint]: category } = object as Record<
      string,
      string
    >;

    if (category === DiscountCategory.ON_TOP) return type === DiscountType.PERCENT;
    if (category === DiscountCategory.SEASONAL) return type === DiscountType.AMOUNT;

    return true;
  }

  defaultMessage() {
    return this.message;
  }
}
