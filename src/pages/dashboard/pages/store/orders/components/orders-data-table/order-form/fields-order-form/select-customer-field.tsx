import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCustomers } from '@/pages/dashboard/pages/store/customers/services/customers.service';
import { useQuery } from '@tanstack/react-query';
import { useOrderForm } from '../order-form-context';
import { useEffect, useState } from 'react';
import { Customer } from '@/models/customer.model';

export const SelectCustomerField = () => {
  const { control, watch } = useOrderForm();
  const [initialData, setInitialData] = useState<Customer[]>([]);
  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
    
  });

  useEffect(() => {
    if (customers) {
      setInitialData(customers.data.sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, [customers]);

  return (
    <FormField
      control={control}
      name="customerId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Customers</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value || ''}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {isLoading ? (
                <SelectItem value="loading" disabled>
                  Loading customers...
                </SelectItem>
              ) : (
                initialData.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormDescription>
            Select a customer to assign to the order.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

