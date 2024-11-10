export const formatCurrency = (value: number | string | undefined) => {
    if (value === undefined) {
      return '-';
    }
  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
