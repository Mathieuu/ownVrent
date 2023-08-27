import { HouseType } from "./house";
import { InvestmentType } from "./investment";
import { computeHistory, substract } from "./maths";
import { MortgageType } from "./mortgage";

export type ConclusionType = {
  renterAheadHistory: Array<NumberNil>;
  renterAheadAfterSellingHistory: Array<NumberNil>;
};

export const buildConclusion = (
  mortgage: MortgageType,
  house: HouseType,
  investment: InvestmentType
): ConclusionType => {
  const renterAheadHistory = computeHistory({
    acc: [],
    offset: 0,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return substract(investment.portfolioValueHistory[year], house.ownerEquityHistory[year]);
    },
  });

  const renterAheadAfterSellingHistory = computeHistory({
    acc: [],
    offset: 0,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return substract(investment.netPortfolioValueIfSoldHistory[year], house.ownerEquityIfHouseSold[year]);
    },
  });

  return {
    renterAheadAfterSellingHistory,
    renterAheadHistory,
  };
};
