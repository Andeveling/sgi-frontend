import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { NotebookTabs } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function ProductDetailsCard() {
  const { control } = useFormContext();

  // Obtenemos los valores observados
  const buyPrice = useWatch({ control, name: 'buyPrice' });
  const sellPrice = useWatch({ control, name: 'sellPrice' });
  const stock = useWatch({ control, name: 'stock' });

  // Si los valores no están definidos, retornamos null o un estado de carga
  if (
    buyPrice === undefined ||
    sellPrice === undefined ||
    stock === undefined
  ) {
    return null; // O un mensaje de carga
  }

  // Cálculos de ganancias
  const unitProfit = sellPrice - buyPrice;
  const totalProfit = unitProfit * stock;

  const maxPrice = Math.max(buyPrice, sellPrice, 1);
  const maxProfit = Math.max(unitProfit, totalProfit, 1);

  // Cálculo de porcentajes
  const buyPricePercentage = (buyPrice / maxPrice) * 100;
  const sellPricePercentage = (sellPrice / maxPrice) * 100;
  const unitProfitPercentage = (unitProfit / maxProfit) * 100;
  const totalProfitPercentage = (totalProfit / maxProfit) * 100;

  // Componente para cada bloque de detalle
  const DetailBlock = ({
    label,
    value,
    percentage,
    colorClass,
  }: {
    label: string;
    value: number | string;
    percentage: number;
    colorClass: string;
  }) => (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">
          {label}: ${value}
        </span>
        <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
      </div>
      <Progress value={percentage} className={`h-2 ${colorClass}`} />
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <NotebookTabs className="h-6 w-6" />
          Product Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DetailBlock
          label="Buy Price"
          value={buyPrice.toFixed(2)}
          percentage={buyPricePercentage}
          colorClass="bg-blue-500"
        />
        <DetailBlock
          label="Sell Price"
          value={sellPrice.toFixed(2)}
          percentage={sellPricePercentage}
          colorClass="bg-green-500"
        />
        <DetailBlock
          label="Unit Profit"
          value={unitProfit.toFixed(2)}
          percentage={unitProfitPercentage}
          colorClass="bg-yellow-500"
        />
        <DetailBlock
          label="Stock"
          value={`${stock} units`}
          percentage={100} // Stock siempre es 100%
          colorClass="bg-gray-500"
        />
        <DetailBlock
          label="Estimated Total Profit"
          value={totalProfit.toFixed(2)}
          percentage={totalProfitPercentage}
          colorClass="bg-red-500"
        />
      </CardContent>
    </Card>
  );
}
