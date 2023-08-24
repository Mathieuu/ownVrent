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
