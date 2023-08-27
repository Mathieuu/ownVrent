import { HouseType } from "./house";
import { computeHistory, divide, multiply, substract, sum } from "./maths";
import { MortgageType } from "./mortgage";

export type RentInputType = {
  monthlyRent: NumberNil;
  rentIncrease: NumberNil;
  renterInsurance: NumberNil;
};

export type RentType = RentInputType & {
  monthlyRentHistory: Array<NumberNil>;
  annualRentHistory: Array<NumberNil>;
  spentOnRentHistory: Array<NumberNil>;
  surplusVsOwningHistory: Array<NumberNil>;
};

export const buildRent = (input: RentInputType, mortgage: MortgageType, house: HouseType): RentType => {
  const monthlyRentHistory = computeHistory({
    acc: [input.monthlyRent],
    offset: 1,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (acc, year) => {
      return multiply(acc[year - 1], sum(1, divide(input.rentIncrease, 100)));
    },
  });

  const annualRentHistory = computeHistory({
    acc: [],
    offset: 0,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      const annualRent = multiply(monthlyRentHistory[year], 12);
      return multiply(annualRent, sum(divide(input.renterInsurance, 100), 1));
    },
  });

  const spentOnRentHistory = computeHistory({
    acc: [annualRentHistory[0]],
    offset: 1,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (acc, year) => {
      return sum(acc[year - 1], annualRentHistory[year]);
    },
  });

  const surplusVsOwningHistory = computeHistory({
    acc: [],
    offset: 0,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return substract(house.annualHouseCostHistory[year], annualRentHistory[year]);
    },
  });

  return {
    ...input,
    monthlyRentHistory,
    annualRentHistory,
    spentOnRentHistory,
    surplusVsOwningHistory,
  };
};
