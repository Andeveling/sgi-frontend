import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormDescription,
  FormMessage,
} from '@/components';
import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const ProductMaxStockInput = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="maxStock"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Max Stock</FormLabel>
          <FormControl>
            <div className="relative">
              <AlertCircle
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
          <FormDescription>
            Set a maximum stock level for alerts
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
