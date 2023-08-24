import { formatMoney } from "./money";

describe("Money", () => {
  it("should format positive numbers without cents", () => {
    expect(formatMoney(1234.56)).toBe("$1,235");
    expect(formatMoney(-1234.56)).toBe("-$1,235");
    expect(formatMoney(1234.5)).toBe("$1,235");
    expect(formatMoney(1234.49)).toBe("$1,234");
    expect(formatMoney(null)).toBe("-");
    expect(formatMoney(undefined)).toBe("-");

    expect(formatMoney(1234.49, { showCents: true })).toBe("$1,234.49");
    expect(formatMoney(1234.49, { notation: "compact" })).toBe("$1K");
  });
});
