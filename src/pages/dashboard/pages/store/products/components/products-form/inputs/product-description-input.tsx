import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components";
import { Textarea } from "@/components/ui/textarea";
import { useProductFormContext } from "../../../context/product-form-context";

export const ProductDescriptionInput = () => {
  const { form } = useProductFormContext();
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