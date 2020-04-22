export default function generateCurrencyFormat(value, currency) {
  if (isNaN(value)) return '#ERROR!';

  value = Number(value).toFixed(2);
  let parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  value = parts.join(',');
  return currency + value;
}
