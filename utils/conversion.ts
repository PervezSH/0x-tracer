export function formatUSDValue(
  value: number,
  fractionDigits: number = 0,
  showNegativeSign: boolean = false
): string {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  const formattedValue = absoluteValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  const sign = isNegative && showNegativeSign ? '-' : '';
  const formattedWithSymbol = `${sign}${formattedValue}`;

  return formattedWithSymbol;
}

export function getDateAndTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDateTime = `${month} ${day}, ${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return formattedDateTime;
}
