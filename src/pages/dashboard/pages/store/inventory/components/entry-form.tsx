import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MovementSchema, MovementForm } from '@/models/movement.model';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ArrowDownToLine } from 'lucide-react';

export function EntryForm() {
  const form = useForm<MovementForm>({
    resolver: zodResolver(MovementSchema),
    defaultValues: {
      type: 'PURCHASE',
      quantity: 0,
      productId: '',
    },
  });

  const onSubmit = (data: MovementForm) => {
    // TODO: Handle form submission (create entry movement)
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* TODO: Fetch products from API */}
                  <SelectItem value="1">Product A</SelectItem>
                  <SelectItem value="2">Product B</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the product for this entry
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Enter the quantity of products to add
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <ArrowDownToLine className="mr-2 h-4 w-4" /> Create Entry
        </Button>
      </form>
    </Form>
  );
}
