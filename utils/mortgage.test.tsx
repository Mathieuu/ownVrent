import { mortgage } from "./defaultValues";

describe("Mortgage", () => {
  it("should compute the right values", () => {
    expect(mortgage.amortizationInMonths).toBeCloseTo(360, 2);
    expect(mortgage.amortizationInYears).toBeCloseTo(30, 2);
    expect(mortgage.closingCosts).toBeCloseTo(15_000, 2);
    expect(mortgage.compoundedPerYears).toBeCloseTo(2, 2);
    expect(mortgage.downpayment).toBeCloseTo(135_000);
    expect(mortgage.downpaymentPercent).toBeCloseTo(21.95, 2);
    expect(mortgage.housePrice).toBeCloseTo(600_000, 2);
    expect(mortgage.interestRatePerMonth).toBeCloseTo(0.48572, 4);
    expect(mortgage.interestRatePerYear).toBeCloseTo(5.9, 2);
    expect(mortgage.leftToPay).toBeCloseTo(480_000, 2);
    expect(mortgage.paymentEachMonth).toBeCloseTo(2825.211675, 4);
    expect(mortgage.totalHouseCost).toBeCloseTo(615000, 2);
    expect(mortgage.totalRepaid).toBeCloseTo(1_017_076.2, 0);

    expect(mortgage.paymentsBreakdownPerMonth).toHaveLength(360);
    [
      [0, 479_506.29, 2_331.5],
      [180, 337316.28, 1644.18],
      [359, 0, 13.66],
    ].forEach(([year, principal, interests]) => {
      expect(mortgage.paymentsBreakdownPerMonth[year]?.principal).toBeCloseTo(principal, 0);
      expect(mortgage.paymentsBreakdownPerMonth[year]?.interests).toBeCloseTo(interests, 0);
    });
  });
});
