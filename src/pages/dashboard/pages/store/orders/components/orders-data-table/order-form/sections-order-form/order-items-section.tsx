import React, { useEffect, useState, useMemo } from 'react';
import { useFieldArray } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Product } from '@/models/product.model';
import { getProducts } from '@/pages/dashboard/pages/store/products/services/product.service';
import { useQuery } from '@tanstack/react-query';
import { useOrderForm } from '../order-form-context';
import { Trash2 } from 'lucide-react';

export const OrderItemsSection = () => {
  const { control } = useOrderForm();

  const [initialData, setInitialData] = useState<Product[]>([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ordersItems',
  });

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (products) {
      setInitialData(
        products.data.sort((a, b) => a.name.localeCompare(b.name)),
      );
    }
  }, [products]);

  const productMap = useMemo(() => {
    return new Map(initialData.map((product) => [product.id, product]));
  }, [initialData]);

  return (
    <Card role="section" className="flex-1">
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
        <CardDescription>Add your order items</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <OrderItemRow
            key={field.id}
            control={control}
            productMap={productMap}
            field={field}
            index={index}
            remove={remove}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={() =>
            append({
              productId: '',
              quantity: 1,
              price: 0,
            })
          }
        >
          Add Item
        </Button>
      </CardFooter>
    </Card>
  );
};

const OrderItemRow = React.memo(
  ({ control, productMap, field, index, remove }: any) => {
    const { productId, quantity = 1 } = field;

    const selectedProduct = productMap.get(productId);
    const sellPrice = selectedProduct?.sellPrice || 0;
    const total = quantity * sellPrice;

    return (
      <div className="grid grid-cols-5 gap-4 items-end">
        <FormField
          control={control}
          name={`ordersItems.${index}.productId`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {Array.from(productMap.values()).map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`ordersItems.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Sell Price</FormLabel>
          <Input type="number" value={sellPrice} readOnly />
        </div>

        <div>
          <FormLabel>Total</FormLabel>
          <Input type="number" value={total} readOnly />
        </div>

        {index > 0 && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  },
);

