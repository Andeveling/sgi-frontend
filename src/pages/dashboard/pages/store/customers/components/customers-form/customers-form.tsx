import { Input } from '@/components';
import { PhoneInput } from '@/components/phone-input/phone-input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCustomerForm } from '../../hooks/use-customer-form';
import { Customer } from '@/models/customer.model';

export default function CustomersForm({ customer }: { customer?: Customer }) {
  const { form, onSubmit, onError } = useCustomerForm({ customer });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  type="text"
                  placeholder="Enter customer name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter your customer name to identify
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Email</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  type="email"
                  placeholder="Enter customer email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter your customer email to identify
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cellphone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Cellphone</FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  defaultCountry="CO"
                  placeholder="Enter your cellphone"
                />
              </FormControl>
              <FormDescription>
                Enter cellphone to identify your customer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
