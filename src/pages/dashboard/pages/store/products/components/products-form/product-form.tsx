import {
  CalendarIcon
} from 'lucide-react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';

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
import { queryClient } from '@/main';
import { CreateProduct } from '@/models/product.model';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { createProduct } from '../../services/product.service';
import { ProductBuyPriceInput } from './inputs/product-buy-price-input';
import { ProductMinimumStockInput } from './inputs/product-minimun-stock-input';
import { ProductNameInput } from './inputs/product-name-input';
import { ProductSellPriceInput } from './inputs/product-sell-price-input';
import { ProductStockInput } from './inputs/product-stock-input';
import SelectCategoryInput from './inputs/select-category-input';
import StoreHiddenInput from './inputs/store-hidden-input';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductForm() {
  const params = useParams()
  const form = useFormContext<CreateProduct>();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
      navigate(`/dashboard/${params.storeId}/products`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<CreateProduct> = (values) => {
    mutate(values);
  };

  const onError: SubmitErrorHandler<CreateProduct> = (errors) => {
    console.log(errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <div className=" shadow-md rounded-lg p-6 space-y-2">
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

          <Button type="submit" className="w-full">
            Create Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
