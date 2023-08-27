import { computeHistory, divide, multiply, substract, sum } from "./maths";
import { MortgageType } from "./mortgage";

export type HouseInputType = {
  maintenancePercent: NumberNil;
  propertyTaxPercent: NumberNil;
  insurancePercent: NumberNil;
  houseAppreciationPercent: NumberNil;
  commissionOnSalePercent: NumberNil;
};

export type HouseType = HouseInputType & {
  houseValueHistory: Array<NumberNil>;
  maintenanceHistory: Array<NumberNil>;
  propertyTaxHistory: Array<NumberNil>;
  insuranceHistory: Array<NumberNil>;
  paymentsHistory: Array<NumberNil>;
  annualHouseCostHistory: Array<NumberNil>;
  mortgageBalanceHistory: Array<NumberNil>;
  ownerEquityHistory: Array<NumberNil>;
  sellingFees: Array<NumberNil>;
  ownerEquityIfHouseSold: Array<NumberNil>;
};

export const buildHouse = (input: HouseInputType, mortgage: MortgageType): HouseType => {
  const houseValueHistory = computeHistory({
    acc: [mortgage.housePrice],
    offset: 1,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (acc, year) => {
      return multiply(acc[year - 1], sum(1, divide(input.houseAppreciationPercent, 100)));
    },
  });

  const maintenanceHistory = computeHistory({
    acc: [],
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return multiply(houseValueHistory[year], divide(input.maintenancePercent ?? 0, 100));
    },
  });

  const propertyTaxHistory = computeHistory({
    acc: [],
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return multiply(houseValueHistory[year], divide(input.propertyTaxPercent ?? 0, 100));
    },
  });

  const insuranceHistory = computeHistory({
    acc: [],
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return multiply(houseValueHistory[year], divide(input.insurancePercent ?? 0, 100));
    },
  });

  // TODO: Check if adding one is correct
  const paymentsHistory = computeHistory({
    acc: [],
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      const yearCount = sum(year, 1);
      if ((yearCount ?? 0) > (mortgage.amortizationInYears ?? 0)) {
        return 0;
      }
      return multiply(mortgage.paymentEachMonth, 12);
    },
  });

  const annualHouseCostHistory = computeHistory({
    acc: [],
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return sum(
        paymentsHistory[year],
        sum(maintenanceHistory[year], sum(propertyTaxHistory[year], insuranceHistory[year]))
      );
    },
  });

  const mortgageBalanceHistory = computeHistory({
    acc: [mortgage.leftToPay],
    offset: 1,
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      const period = substract(multiply(year, 12), 1) ?? 0;
      const balance = mortgage.paymentsBreakdownPerMonth[period ?? 0] ?? 0;
      return balance.principal ?? 0;
    },
  });

  const ownerEquityHistory = computeHistory({
    acc: [],
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return substract(houseValueHistory[year], mortgageBalanceHistory[year]);
    },
  });

  const sellingFees = computeHistory({
    acc: [],
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return multiply(houseValueHistory[year], divide(input.commissionOnSalePercent ?? 0, 100));
    },
  });

  const ownerEquityIfHouseSold = computeHistory({
    acc: [],
    yearCount: mortgage.amortizationInYears ?? 0,
    computeNextValue: (_, year) => {
      return substract(ownerEquityHistory[year], sellingFees[year]);
    },
  });

  return {
    ...input,
    houseValueHistory,
    maintenanceHistory,
    propertyTaxHistory,
    insuranceHistory,
    paymentsHistory,
    annualHouseCostHistory,
    mortgageBalanceHistory,
    ownerEquityHistory,
    sellingFees,
    ownerEquityIfHouseSold,
  };
};
