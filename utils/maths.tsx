import { isNil } from "lodash";

export const sum = (a: NumberNil, b: NumberNil): NumberNil => {
  if (isNil(a) || isNil(b)) {
    return null;
  }

  return a + b;
};

export const substract = (a: NumberNil, b: NumberNil): NumberNil => {
  if (isNil(a) || isNil(b)) {
    return null;
  }

  return a - b;
};

export const multiply = (a: NumberNil, b: NumberNil): NumberNil => {
  if (isNil(a) || isNil(b)) {
    return null;
  }

  return a * b;
};

export const divide = (a: NumberNil, b: NumberNil): NumberNil => {
  if (isNil(a) || isNil(b)) {
    return null;
  }

  return a / b;
};

export const pow = (a: NumberNil, b: NumberNil): NumberNil => {
  if (isNil(a) || isNil(b)) {
    return null;
  }

  return Math.pow(a, b);
};

export function computeHistory({
  yearCount,
  acc,
  computeNextValue,
  offset = 0,
}: {
  yearCount: number;
  acc: Array<NumberNil>;
  computeNextValue: (acc: Array<NumberNil>, offset: number) => NumberNil;
  offset?: number;
}) {
  for (let i = offset; i < yearCount + 1; i++) {
    acc.push(computeNextValue(acc, i));
  }
  return acc;
}
