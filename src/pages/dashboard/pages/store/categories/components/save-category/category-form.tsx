import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SaveCategory } from '@/models/category.model';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

type CategoryFormProps = {
  form: UseFormReturn<SaveCategory>;
  onSubmit: SubmitHandler<SaveCategory>;
};

export const CategoryForm = ({ form, onSubmit }: CategoryFormProps) => {
  const selectedStore = useStoreSelected((state) => state.store);
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <input type="hidden" name="storeId" value={selectedStore?.id} />
        <div className="flex items-center gap-2">
          <div className="flex-grow">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <Input
              id="name"
              placeholder="Category Name"
              {...form.register('name')}
              className="w-full"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <Button type="submit" className="h-10 border-5 z-50" onClick={form.handleSubmit(onSubmit)}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
