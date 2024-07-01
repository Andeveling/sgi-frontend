import { Progress } from "flowbite-react";

export const StockStatus = ({
  optimal_quantity,
  quantity,
}: Readonly<{
  optimal_quantity: number;
  quantity: number;
}>) => {
  // Calcular el porcentaje del inventario
  const percentage = (quantity / optimal_quantity) * 100;

  // Asegurar que el porcentaje esté entre 0 y 100
  const boundedPercentage = Math.max(0, Math.min(100, percentage));

  // Determinar el color de la barra
  let color = "";
  if (boundedPercentage >= 80) {
    color = "green";
  } else if (boundedPercentage >= 30 && boundedPercentage < 80) {
    color = "yellow";
  } else if (boundedPercentage >= 0 && boundedPercentage < 30) {
    color = "red";
  }

  return (
    <Progress
      progress={Math.round(boundedPercentage)}
      color={color}
      progressLabelPosition="inside"
      labelProgress
      size={"lg"}
    />
  );
};
