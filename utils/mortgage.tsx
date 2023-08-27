import { divide, multiply, pow, substract, sum } from "./maths";

type PaymentBreakdownPerMonthType = Array<{
  principal: NumberNil;
  interests: NumberNil;
}>;

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
  paymentEachMonth: NumberNil;
  totalHouseCost: NumberNil;
  totalRepaid: NumberNil;
  paymentsBreakdownPerMonth: PaymentBreakdownPerMonthType;
};

// =P*r*(1+r)^n/((1+r)^n-1)
const PMT = (P: NumberNil, r: NumberNil, n: NumberNil) => {
  const numerator1 = multiply(P, r);
  const numerator2 = pow(sum(1, r), n);
  const numerator = multiply(numerator1, numerator2);

  const denominator = substract(numerator2, 1);

  return divide(numerator, denominator);
};

const buildPaymentsBreakdownPerMonth = ({
  amortizationInMonths,
  leftToPay,
  interestRatePerMonth,
  paymentEachMonth,
}: {
  amortizationInMonths: NumberNil;
  leftToPay: NumberNil;
  interestRatePerMonth: NumberNil;
  paymentEachMonth: NumberNil;
}): PaymentBreakdownPerMonthType => {
  let principal = leftToPay;
  const paymentsBreakdownPerMonth = [];

  for (let i = 0; i < (amortizationInMonths ?? 0); i++) {
    const interests = multiply(principal, divide(interestRatePerMonth, 100));
    principal = substract(principal, substract(paymentEachMonth, interests));

    paymentsBreakdownPerMonth.push({
      principal,
      interests,
    });
  }

  return paymentsBreakdownPerMonth;
};

export const buildMortgage = (input: MortgageInputType): MortgageType => {
  const totalHouseCost = sum(input.housePrice, input.closingCosts);
  const downpaymentPercent = multiply(divide(input.downpayment, totalHouseCost), 100);
  const leftToPay = substract(totalHouseCost, input.downpayment);
  const amortizationInMonths = multiply(input.amortizationInYears, 12);

  // =(1+interestRatePerYear/compoundedPerYears)^(compoundedPerYears/12)-1
  const interestRatePerMonth = (function () {
    const toPow = sum(1, divide(divide(input.interestRatePerYear, 100), input.compoundedPerYears));
    const res = substract(pow(toPow, divide(input.compoundedPerYears, 12)), 1);
    return multiply(res, 100); // Percentage
  })();

  const paymentEachMonth = PMT(leftToPay, divide(interestRatePerMonth, 100), amortizationInMonths);
  const totalRepaid = multiply(paymentEachMonth, amortizationInMonths);

  const paymentsBreakdownPerMonth = buildPaymentsBreakdownPerMonth({
    amortizationInMonths,
    leftToPay,
    interestRatePerMonth,
    paymentEachMonth,
  });

  return {
    ...input,
    amortizationInMonths,
    downpaymentPercent,
    interestRatePerMonth,
    leftToPay,
    paymentEachMonth,
    totalHouseCost,
    totalRepaid,
    paymentsBreakdownPerMonth,
  };
};
