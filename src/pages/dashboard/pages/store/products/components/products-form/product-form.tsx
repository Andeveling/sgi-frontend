import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import { ProductBuyPriceInput } from './inputs/product-buy-price-input';
import { ProductMinimumStockInput } from './inputs/product-minimun-stock-input';
import { ProductNameInput } from './inputs/product-name-input';
import { ProductSellPriceInput } from './inputs/product-sell-price-input';
import { ProductStockInput } from './inputs/product-stock-input';
import SelectCategoryInput from './inputs/select-category-input';
import StoreHiddenInput from './inputs/store-hidden-input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ProductDescriptionInput } from './inputs/product-description-input';
import { ExpirationProductDateInput } from './inputs/expiration-product-date-input';
import { ProductMaxStockInput } from './inputs/product-max-stock-input';

export default function ProductForm() {
  const form = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create a new product</CardTitle>
        <CardDescription>
          Add a new product to your inventory management system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-4">
            <div className="space-y-4">
              <ProductNameInput />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductBuyPriceInput />
                <ProductSellPriceInput />
              </div>
              <ProductStockInput />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductMinimumStockInput />
                <ProductMaxStockInput />
              </div>

              <ProductDescriptionInput />
              <ExpirationProductDateInput />

              <SelectCategoryInput />
              <StoreHiddenInput />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Save product
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
