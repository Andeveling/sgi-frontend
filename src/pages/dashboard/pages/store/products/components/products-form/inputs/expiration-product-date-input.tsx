import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const ExpirationProductDateInput = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="expiration"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Expiration Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || date > new Date('2100-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            Optional: Set an expiration date for the product
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
