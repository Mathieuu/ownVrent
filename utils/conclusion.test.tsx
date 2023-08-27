import { conclusion } from "./defaultValues";

describe("Conclusion", () => {
  it("should compute the right values", () => {
    [
      [0, 15_000],
      [2, 14_813],
      [30, 137_449],
    ].forEach(([year, value]) => {
      expect(conclusion.renterAheadHistory[year]).toBeCloseTo(value, 0);
    });

    [
      [0, 42_000],
      [2, 39_955],
      [30, -62_099],
    ].forEach(([year, value]) => {
      expect(conclusion.renterAheadAfterSellingHistory[year]).toBeCloseTo(value, 0);
    });
  });
});
