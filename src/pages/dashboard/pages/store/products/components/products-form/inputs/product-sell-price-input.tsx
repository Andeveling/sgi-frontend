import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { DollarSign } from 'lucide-react';
import { useProductFormContext } from '../../../context/product-form-context';

export const ProductSellPriceInput = () => {
  const { form } = useProductFormContext();
  return (
    <FormField
      control={form.control}
      name="sellPrice"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sell Price</FormLabel>
          <FormControl>
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2 "
                size={18}
              />
              <Input
                className="pl-10"
                type="number"
                placeholder="0"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
