export const currencyFormatter = (value: number | string) => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};
