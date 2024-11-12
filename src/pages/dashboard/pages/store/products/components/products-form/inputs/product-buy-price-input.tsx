import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
} from '@/components';
import { DollarSign } from 'lucide-react';
import { useProductFormContext } from '../../../context/product-form-context';

export const ProductBuyPriceInput = () => {
  const { form } = useProductFormContext();
  return (
    <FormField
      control={form.control}
      name="buyPrice"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Buy Price</FormLabel>
          <FormControl>
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
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
