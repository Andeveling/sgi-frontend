import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
} from '@/components';
import { Package } from 'lucide-react';
import { useProductFormContext } from '../../../context/product-form-context';

export const ProductNameInput = () => {
  const { form } = useProductFormContext();
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Name</FormLabel>
          <FormControl>
            <div className="relative">
              <Package
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                size={18}
              />
              <Input
                className="pl-10"
                placeholder="Enter product name"
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
