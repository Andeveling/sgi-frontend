import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Form,
} from '@/components';
import { PhoneInput } from '@/components/phone-input/phone-input';
import { CustomerForm, CustomerFormSchema } from '@/models/customer.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateCustomer } from '../../hooks/use-create-customer-hook';

export const CreateCustomerForm = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const form = useForm<CustomerForm>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      cellphone: '',
      identification: '',
    },
  });
  const createCustomerMutation = useCreateCustomer();

  const onSubmit: SubmitHandler<CustomerForm> = (data) => {
    createCustomerMutation.mutate(data, {
      onSuccess: () => closeModal(),
    });
  };

  const onError: SubmitErrorHandler<CustomerForm> = (errors) => {
    console.log(errors);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input
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
          name="identification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Identification</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter customer identification"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter your customer identification to identify
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
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Cellphone Number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  defaultCountry="CO"
                  placeholder="Enter a phone number"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-left">
                Enter a phone number with whatsApp or Telegram
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
