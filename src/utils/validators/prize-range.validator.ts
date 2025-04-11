import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class PrizeRangeValidator implements ValidatorConstraintInterface {
  private message: string;

  validate(_: unknown, { constraints, object }: ValidationArguments) {
    const {
      isOptional,
      minConstraint = 'minPrize',
      maxConstraint = 'maxPrize',
    } = constraints?.[0] ?? {};

    this.message = `range of ${minConstraint} and ${maxConstraint} must be valid`;

    const { [minConstraint]: minPrize, [maxConstraint]: maxPrize } = object as Record<
      number,
      number
    >;

    if (minPrize && maxPrize) return minPrize > 0 && maxPrize >= minPrize;
    if (minPrize) return minPrize > 0;
    if (maxPrize) return maxPrize > 0;

    return isOptional;
  }

  defaultMessage() {
    return this.message;
  }
}
