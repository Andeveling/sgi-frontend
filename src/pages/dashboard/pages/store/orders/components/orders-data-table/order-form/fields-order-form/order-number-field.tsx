import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import { useOrderForm } from '../order-form-context';
import { Input } from '@/components/ui/input';
import { Hash } from 'lucide-react';

export const OrderNumberField = () => {
  const { control } = useOrderForm();
  return (
    <FormField
      control={control}
      name="orderNumber"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Order Number</FormLabel>
          <FormControl>
            <div className="relative">
              <Hash
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                size={18}
              />
              <Input
                className="pl-10"
                type="number"
                placeholder="0"
                {...field}
                onChange={(e) => field.onChange(+e.target.value)}
                readOnly
                disabled
              />
            </div>
          </FormControl>
          <FormDescription>
            The order number generated automatically.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
