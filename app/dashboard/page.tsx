"use client";
import { currencyFormatter } from "@/utils/currencyFormatter";
import {
  AreaChart,
  BarChart,
  Card,
  DonutChart,
  Legend,
  List,
  ListItem,
  ProgressBar,
} from "@tremor/react";

const productosMasVendidos = [
  {
    id: 1,
    name: "Laptop HP 14",
    count: 32,
    category: "Laptop",
  },
  {
    id: 2,
    name: "Impresora Epson",
    count: 12,
    category: "Impresora",
  },
  {
    id: 3,
    name: "Tablet Samsung",
    count: 7,
    category: "Tablet",
  },
  {
    id: 4,
    name: "Teclado Razer",
    count: 3,
    category: "Teclado",
  },
];

export default function HomePage() {
  const unitFormatter = (number: number) =>
    `${Intl.NumberFormat("es-CO").format(number).toString()} unds`;

  return (
    <div className="grid grid-cols-4 gap-2 p-6">
      <Card>
        <h4 className="text-tremor-title text-tremor-content dark:text-dark-tremor-content">
          Ventas Diarias
        </h4>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {currencyFormatter(1000000)}
        </p>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mt-4 flex items-center justify-between">
          <span>32% del objetivo Diario</span>
          <span>{currencyFormatter(500000)}</span>
        </p>
        <ProgressBar value={32} className="mt-2" />
      </Card>
      <Card>
        <h4 className="text-tremor-title text-tremor-content dark:text-dark-tremor-content">
          Ventas Mensuales
        </h4>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {currencyFormatter(13560000)}
        </p>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mt-4 flex items-center justify-between">
          <span>50% del objetivo mensual</span>
          <span>{currencyFormatter(5000000)}</span>
        </p>
        <ProgressBar value={32} className="mt-2" />
      </Card>
      <Card className="col-span-2">
        <h4 className="text-tremor-title text-tremor-content dark:text-dark-tremor-content">
          Ventas Anuales
        </h4>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {currencyFormatter(1000000)}
        </p>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mt-4 flex items-center justify-between">
          <span>32% del objetivo mensual</span>
          <span>{currencyFormatter(50000000)}</span>
        </p>
        <ProgressBar value={32} className="mt-2" />
      </Card>
      <Card className="col-span-4">
        <h3 className="text-tremor-title text-tremor-content dark:text-dark-tremor-content">
          Objetivos de ventas por mes
        </h3>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          $34,567
        </p>
        <AreaChartHero />
      </Card>
      <Card className="col-span-3">
        <h4 className="text-tremor-title text-tremor-content dark:text-dark-tremor-content">
          Mejores vendedores
        </h4>
        <BarChartHero />
      </Card>
      <Card className="flex flex-col items-center justify-center gap-4">
        <h4 className="text-tremor-title text-tremor-content dark:text-dark-tremor-content">
          Productos mas vendidos
        </h4>
        <DonutChart
          data={productosMasVendidos.map((product) => {
            return {
              name: product.name,
              value: product.count,
            };
          })}
          category="value"
          index="name"
          valueFormatter={unitFormatter}
          colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
          className="w-40"
        />
        <Legend
          categories={productosMasVendidos.map((product) => product.category)}
          colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
          className="max-w-xs"
        />
      </Card>
    </div>
  );
}

// Datos con ventas de los vendedores
const BarChardata = [
  {
    name: "Ana Trujillo",
    ventas: 2488000,
  },
  {
    name: "Antonio Moreno",
    ventas: 1896000,
  },
  {
    name: "Carlos Hernández",
    ventas: 2390000,
  },
  {
    name: "Felipe Izquierdo",
    ventas: 3490000,
  },
];

export const BarChartHero = () => (
  <BarChart
    data={BarChardata}
    index="name"
    categories={["ventas"]}
    colors={["blue"]}
    valueFormatter={currencyFormatter}
    yAxisWidth={80}
    onValueChange={(v) => console.log(v)}
  />
);

const salesTargets = [
  {
    id: 1,
    date: "Ene 2022",
    sales: 50000,
    target: 600000,
  },
  {
    id: 2,
    date: "Feb 2022",
    sales: 800000,
    target: 700000,
  },
  {
    id: 3,
    date: "Mar 2022",
    sales: 500000,
    target: 800000,
  },
  {
    id: 4,
    date: "Abr 2022",
    sales: 800000,
    target: 900000,
  },
  {
    id: 5,
    date: "May 2022",
    sales: 1900000,
    target: 1000000,
  },
  {
    id: 6,
    date: "Jun 2022",
    sales: 500000,
    target: 1100000,
  },
];

export function AreaChartHero() {
  return (
    <AreaChart
      className="h-80"
      data={salesTargets}
      index="date"
      categories={["sales", "target"]}
      colors={["indigo", "rose"]}
      valueFormatter={currencyFormatter}
      yAxisWidth={80}
      onValueChange={(v) => console.log(v)}
    />
  );
}

export function BestSellingProducts() {
  return (
    <div className="mx-auto max-w-md">
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
        Productos con mas utilidad
      </h3>
      <List>
        <ListItem>
          <span>GPU RTX 3090</span>
          <span>1000</span>
        </ListItem>
        <ListItem>
          <span>Rafel Nadal</span>
          <span>9,205</span>
        </ListItem>
        <ListItem>
          <span>Novak Djokovic</span>
          <span>8,310</span>
        </ListItem>
        <ListItem>
          <span>Andy Murray</span>
          <span>7,030</span>
        </ListItem>
      </List>
    </div>
  );
}
