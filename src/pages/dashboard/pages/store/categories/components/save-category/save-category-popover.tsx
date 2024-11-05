import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CategoryForm } from './category-form';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  createCategory,
  updateCategory,
} from '../../services/category.service';
import { queryClient } from '@/main';
import { SaveCategory, saveCategorySchema } from '@/models/category.model';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';

interface SaveCategoryPopoverProps {
  initialData?: SaveCategory;
}

export function CategoryPopover({ initialData }: SaveCategoryPopoverProps) {
  const isEditing = !!initialData;
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: isEditing ? updateCategory : createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const selectedStore = useStoreSelected((state) => state.store);

  const form = useForm<SaveCategory>({
    resolver: zodResolver(saveCategorySchema),
    defaultValues: {
      name: '',
      storeId: selectedStore?.id,
    },
  });

  const onSubmit: SubmitHandler<SaveCategory> = async (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={isEditing ? 'link' : 'default'} size="sm">
          {isEditing ? (
            'Edit Category'
          ) : (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Create new category
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        sideOffset={10}
        className="w-64 p-4"
      >
        <CategoryForm form={form} onSubmit={onSubmit} />
      </PopoverContent>
    </Popover>
  );
}
