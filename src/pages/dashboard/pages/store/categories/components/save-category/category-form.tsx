import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { SaveCategory } from '../../schemas/category-schema';

type CategoryFormProps = {
  form: UseFormReturn<SaveCategory>;
  onSubmit: SubmitHandler<SaveCategory>;
};

export const CategoryForm = ({ form, onSubmit }: CategoryFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          </div>

          <Button type="submit" className="h-10">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
