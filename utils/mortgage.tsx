import { divide, multiply, pow, substract, sum } from "./maths";

export type MortgageInputType = {
  housePrice: NumberNil;
  closingCosts: NumberNil;
  downpayment: NumberNil;
  amortizationInYears: NumberNil;
  compoundedPerYears: NumberNil;
  interestRatePerYear: NumberNil;
};

export type MortgageType = MortgageInputType & {
  amortizationInMonths: NumberNil;
  downpaymentPercent: NumberNil;
  interestRatePerMonth: NumberNil;
  leftToPay: NumberNil;
  paymentsPerMonth: NumberNil;
  totalHostCost: NumberNil;
  totalRepaid: NumberNil;
};

// =P*r*(1+r)^n/((1+r)^n-1)
const PMT = (P: NumberNil, r: NumberNil, n: NumberNil) => {
  const numerator1 = multiply(P, r);
  const numerator2 = pow(sum(1, r), n);
  const numerator = multiply(numerator1, numerator2);

  const denominator = substract(numerator2, 1);

  return divide(numerator, denominator);
};

export const buildMortgage = (input: MortgageInputType): MortgageType => {
  const totalHostCost = sum(input.housePrice, input.closingCosts);
  const downpaymentPercent = multiply(divide(input.downpayment, totalHostCost), 100);
  const leftToPay = substract(totalHostCost, input.downpayment);
  const amortizationInMonths = multiply(input.amortizationInYears, 12);

  // =(1+interestRatePerYear/compoundedPerYears)^(compoundedPerYears/12)-1
  const interestRatePerMonth = (function () {
    const toPow = sum(1, divide(divide(input.interestRatePerYear, 100), input.compoundedPerYears));
    const res = substract(pow(toPow, divide(input.compoundedPerYears, 12)), 1);
    return multiply(res, 100); // Percentage
  })();

  const paymentsPerMonth = PMT(leftToPay, divide(interestRatePerMonth, 100), amortizationInMonths);
  const totalRepaid = multiply(paymentsPerMonth, amortizationInMonths);

  return {
    ...input,
    amortizationInMonths,
    downpaymentPercent,
    interestRatePerMonth,
    leftToPay,
    paymentsPerMonth,
    totalHostCost,
    totalRepaid,
  };
};
