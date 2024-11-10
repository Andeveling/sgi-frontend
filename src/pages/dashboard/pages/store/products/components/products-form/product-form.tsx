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
            <div className='space-y-4'> 
              <ProductNameInput />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductBuyPriceInput />
                <ProductSellPriceInput />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductStockInput />
                <ProductMinimumStockInput />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Expiration Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date > new Date('2100-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Optional: Set an expiration date for the product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
