import { house } from "./defaultValues";

describe("House", () => {
  it("should compute the right values", () => {
    expect(house.houseValueHistory[2]).toBeCloseTo(642735, 0);

    expect(house.maintenanceHistory[2]).toBeCloseTo(3856, 0);
    expect(house.propertyTaxHistory[2]).toBeCloseTo(3856, 0);
    expect(house.insuranceHistory[2]).toBeCloseTo(1542.56, 0);
    expect(house.annualHouseCostHistory[2]).toBeCloseTo(43158, 0);

    expect(house.mortgageBalanceHistory[2]).toBeCloseTo(467465, 0);
    expect(house.ownerEquityHistory[2]).toBeCloseTo(175270, 0);
    expect(house.sellingFees[2]).toBeCloseTo(28923, 0);
    expect(house.ownerEquityIfHouseSold[2]).toBeCloseTo(146347, 0);

    [
      [0, 93000],
      [2, 146347],
      [30, 1608293],
    ].forEach(([year, value]) => {
      expect(house.ownerEquityIfHouseSold[year]).toBeCloseTo(value, 0);
    });
  });
});
