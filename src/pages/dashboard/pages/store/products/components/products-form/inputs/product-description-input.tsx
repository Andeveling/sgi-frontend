import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export const ProductDescriptionInput = () => {
    const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter product description (optional)"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}