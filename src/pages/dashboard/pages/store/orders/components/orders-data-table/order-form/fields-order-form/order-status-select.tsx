import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useOrderForm } from '../order-form-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderStatusEnum } from '@/models/orders.model';

export default function OrderStatusSelect() {
  const { control } = useOrderForm();

  return (
    <FormField
      name="status"
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Select a status for the order</FormLabel>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(OrderStatusEnum.Values).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>Select a status for the order.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
