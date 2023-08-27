import { rent } from "./defaultValues";

describe("Rent", () => {
  it("should compute the right values", () => {
    expect(rent.monthlyRentHistory[2]).toBeCloseTo(2122, 0);
    expect(rent.annualRentHistory[2]).toBeCloseTo(25716, 0);
    expect(rent.spentOnRentHistory[2]).toBeCloseTo(74923, 0);

    [
      [0, 18303],
      [2, 17442],
      [30, -34586],
    ].forEach(([year, value]) => {
      expect(rent.surplusVsOwningHistory[year]).toBeCloseTo(value, 0);
    });
  });
});
