import { computeHistory, divide, multiply, substract, sum } from "./maths";
import { MortgageType } from "./mortgage";
import { RentType } from "./rent";

export type InvestmentInputType = {
  investmentReturn: NumberNil;
  investmentTaxRate: NumberNil;
};

export type InvestmentType = InvestmentInputType & {
  annualGainHistory: Array<NumberNil>;
  cumulativeGainHistory: Array<NumberNil>;
  netGainIfSoldHistory: Array<NumberNil>;
  netPortfolioValueIfSoldHistory: Array<NumberNil>;
  portfolioValueHistory: Array<NumberNil>;
  taxCostIfSoldHistory: Array<NumberNil>;
};

export const buildInvestment = (input: InvestmentInputType, mortgage: MortgageType, rent: RentType): InvestmentType => {
  const portfolioValueHistory = computeHistory({
    acc: [mortgage.downpayment],
    offset: 1,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (acc, year) => {
      const initialAmountAppreciation = multiply(acc[year - 1], sum(1, divide(input.investmentReturn, 100)));
      // TODO: What if surplus negative?
      const surplusAppreciation = divide(
        multiply(rent.surplusVsOwningHistory[year - 1], divide(input.investmentReturn, 100)),
        2 // Divide by 2 because invested over the year
      );
      return sum(sum(initialAmountAppreciation, surplusAppreciation), rent.surplusVsOwningHistory[year - 1]);
    },
  });

  const annualGainHistory = computeHistory({
    acc: [0],
    offset: 1,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return substract(
        substract(portfolioValueHistory[year], portfolioValueHistory[year - 1]),
        rent.surplusVsOwningHistory[year - 1]
      );
    },
  });

  const cumulativeGainHistory = computeHistory({
    acc: [0],
    offset: 1,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (acc, year) => {
      return sum(acc[year - 1], annualGainHistory[year]);
    },
  });

  const taxCostIfSoldHistory = computeHistory({
    acc: [],
    offset: 0,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return multiply(cumulativeGainHistory[year], divide(input.investmentTaxRate, 100));
    },
  });

  const netGainIfSoldHistory = computeHistory({
    acc: [],
    offset: 0,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return substract(cumulativeGainHistory[year], taxCostIfSoldHistory[year]);
    },
  });

  const netPortfolioValueIfSoldHistory = computeHistory({
    acc: [],
    offset: 0,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return substract(portfolioValueHistory[year], taxCostIfSoldHistory[year]);
    },
  });

  return {
    ...input,
    annualGainHistory,
    cumulativeGainHistory,
    netGainIfSoldHistory,
    netPortfolioValueIfSoldHistory,
    portfolioValueHistory,
    taxCostIfSoldHistory,
  };
};
