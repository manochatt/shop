export class RegExpr {
  static fromString = (str: string, flags?: string) => {
    const SPECIAL_CHARACTER_PATTERN = /[^\w ]/g;

    return new RegExp(str.replace(SPECIAL_CHARACTER_PATTERN, '\\$&'), flags);
  };
}
