import { buildHouse } from "./house";
import { buildMortgage } from "./mortgage";
import { buildRent } from "./rent";

export const defaultMortgageInput = {
  housePrice: 600_000,
  closingCosts: 15_000,
  downpayment: 135_000,
  amortizationInYears: 30,
  compoundedPerYears: 2,
  interestRatePerYear: 5.9,
};

export const mortgage = buildMortgage(defaultMortgageInput);

export const defaultHouseInput = {
  maintenancePercent: 0.6,
  propertyTaxPercent: 0.6,
  insurancePercent: 0.24,
  houseAppreciationPercent: 3.5,
  commissionOnSalePercent: 4.5,
};

export const house = buildHouse(defaultHouseInput, mortgage);

export const defaultRentInput = {
  monthlyRent: 2000,
  rentIncrease: 3,
  renterInsurance: 1,
};

export const rent = buildRent(defaultRentInput, mortgage, house);
