import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart3, DollarSign, TrendingUp } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function ProductStatisticsCard() {
  const { control } = useFormContext();

  const buyPrice = useWatch({ control, name: 'buyPrice' });
  const sellPrice = useWatch({ control, name: 'sellPrice' });
  const stock = useWatch({ control, name: 'stock' });

  const unitProfit = sellPrice - buyPrice;
  const totalProfit = unitProfit * stock;

  const chartData = [
    {
      name: 'Buy Price',
      value: buyPrice,
      icon: <DollarSign className="h-4 w-4 text-blue-500" />,
    },
    {
      name: 'Sell Price',
      value: sellPrice,
      icon: <DollarSign className="h-4 w-4 text-green-500" />,
    },
    {
      name: 'Unit Profit',
      value: unitProfit,
      icon: <TrendingUp className="h-4 w-4 text-purple-500" />,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Product Statistics
        </CardTitle>
        <CardDescription>
          Overview of product pricing and profit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: 'Amount',
              color: 'hsl(var(--primary))',
            },
          }}
        >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="value"
              fill="var(--color-value)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          Total Profit: ${totalProfit}
        </div>
        <div className="flex items-center gap-1">
          <BarChart3 className="h-4 w-4" />
          Stock: {stock} units
        </div>
      </CardFooter>
    </Card>
  );
}
