export function percentageChange(
  currentValue: number,
  previousValue: number
): {
  changeString: string;
  isNegative: boolean;
} {
  const change = ((currentValue - previousValue) / previousValue) * 100;
  const changeString = `${change.toFixed(2)}%`;
  const isNegative = currentValue < previousValue;

  return { changeString, isNegative };
}
