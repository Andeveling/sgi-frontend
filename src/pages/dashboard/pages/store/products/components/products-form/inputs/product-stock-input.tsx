import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  FormDescription,
} from '@/components';
import { ShoppingCart } from 'lucide-react';
import { useProductFormContext } from '../../../context/product-form-context';

export const ProductStockInput = () => {
  const { form, isEdit } = useProductFormContext();
  return (
    <FormField
      control={form.control}
      name="stock"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Initial Stock</FormLabel>
          <FormControl>
            <div className="relative">
              <ShoppingCart
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                size={18}
              />
              <Input
                readOnly={isEdit}
                disabled={isEdit}
                className="pl-10"
                type="number"
                placeholder="0"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
              />
            </div>
          </FormControl>
          {isEdit && (
            <FormDescription>
              If you want to change the stock, you can in movement products
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
