import { buildMortgage } from "./mortgage";

describe("Mortgage", () => {
  it("should compute the right values", () => {
    const input = {
      housePrice: 2_500_000,
      closingCosts: 48_625,
      downpayment: 1_048_625,
      amortizationInYears: 30,
      compoundedPerYears: 2,
      interestRatePerYear: 5.9,
    };

    const mortgage = buildMortgage(input);

    expect(mortgage.amortizationInMonths).toBeCloseTo(360, 2);
    expect(mortgage.amortizationInYears).toBeCloseTo(30, 2);
    expect(mortgage.closingCosts).toBeCloseTo(48_625, 2);
    expect(mortgage.compoundedPerYears).toBeCloseTo(2, 2);
    expect(mortgage.downpayment).toBeCloseTo(1_048_625, 2);
    expect(mortgage.downpaymentPercent).toBeCloseTo(41.14, 2);
    expect(mortgage.housePrice).toBeCloseTo(2_500_000, 2);
    expect(mortgage.interestRatePerMonth).toBeCloseTo(0.48572, 4);
    expect(mortgage.interestRatePerYear).toBeCloseTo(5.9, 2);
    expect(mortgage.leftToPay).toBeCloseTo(1_500_000, 2);
    expect(mortgage.paymentsPerMonth).toBeCloseTo(8828.78648, 4);
    expect(mortgage.totalHostCost).toBeCloseTo(2_548_625, 2);
    expect(mortgage.totalRepaid).toBeCloseTo(3_178_363.13, 2);
  });
});
