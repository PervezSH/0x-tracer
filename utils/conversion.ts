export function formatCurrencyValue(
  value: number,
  fractionDigits: number = 0,
  showNegativeSign: boolean = false,
  currencySign: string = '$',
  shortFormatThreshold: number = 1000000000000,
  shortFormatFractionDigits: number = 2
): string {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);

  let formattedValue;

  if (absoluteValue < shortFormatThreshold) {
    formattedValue = absoluteValue.toLocaleString('en-US', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  } else {
    const units = ['K', 'M', 'B', 'T'];
    const order = Math.floor(Math.log(absoluteValue) / Math.log(1000));
    const unitname = units[order - 1];
    const num = absoluteValue / Math.pow(1000, order);

    formattedValue = `${num.toFixed(shortFormatFractionDigits)}${unitname}`;
  }

  const sign = isNegative && showNegativeSign ? '-' : '';
  const formattedWithSymbol = `${sign}${currencySign}${formattedValue}`;

  return formattedWithSymbol;
}

export function getDateAndTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDateTime = `${month} ${day}, ${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return formattedDateTime;
}
