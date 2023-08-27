import { investment } from "./defaultValues";

describe("Investment", () => {
  it("should compute the right values", () => {
    expect(investment.portfolioValueHistory[2]).toBeCloseTo(190_083, 0);
    expect(investment.annualGainHistory[2]).toBeCloseTo(10253, 0);
    expect(investment.cumulativeGainHistory[2]).toBeCloseTo(18903, 0);
    [
      [0, 135_000],
      [2, 186_302],
      [30, 1546194],
    ].forEach(([year, value]) => {
      expect(investment.netPortfolioValueIfSoldHistory[year]).toBeCloseTo(value, 0);
    });
  });
});
