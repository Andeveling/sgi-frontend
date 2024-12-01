import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { queryClient } from '@/main';
import {
  Category,
  SaveCategory,
  SaveCategorySchema,
} from '@/models/category.model';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  createCategory,
  updateCategory,
} from '../../services/category.service';
import { toast } from 'sonner';
import { useEffect } from 'react';


export const CategoryForm = ({
  isEditing,
  initialData,
  closePopover,
}: {
  isEditing?: boolean;
  initialData?: Category;
  closePopover: () => void;
}) => {
  const selectedStore = useStoreSelected((state) => state.store);

  useEffect(() => {
    useStoreSelected.persist.rehydrate();
  }, []);

  const form = useForm<SaveCategory>({
    resolver: zodResolver(SaveCategorySchema),
    defaultValues: {
      id: initialData?.id ?? '',
      name: initialData?.name ?? '',
      storeId: selectedStore?.id,
    },
    mode: 'onSubmit',
  });

  const mutation = useMutation({
    mutationFn: isEditing ? updateCategory : createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category saved successfully');
      form.reset();
      closePopover();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<SaveCategory> = (data) => {
    mutation.mutate(data);
  };

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
          </div>

          <Button type="submit" className="h-10 border-5 z-50">
            Saves
          </Button>
        </div>
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </form>
    </Form>
  );
};
