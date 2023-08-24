export function formatMoney(
  value: number | null | undefined,
  options?: {
    showCents?: boolean;
    notation?: Intl.NumberFormatOptions["notation"];
  }
): string {
  if (value === null || value === undefined) {
    return "-";
  }

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: options?.showCents ? 2 : 0,
    maximumFractionDigits: options?.showCents ? 2 : 0,
    notation: options?.notation,
  }).format(value);

  return formatted;
}
