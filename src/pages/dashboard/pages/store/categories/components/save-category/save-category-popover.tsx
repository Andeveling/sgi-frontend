import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CategoryForm } from './category-form';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import {
  SaveCategory,
  saveCategorySchema,
} from '../../schemas/category-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

interface SaveCategoryPopoverProps {
  initialData?: SaveCategory;
}

export function CategoryPopover({ initialData }: SaveCategoryPopoverProps) {
  const isEditing = !!initialData;
  const [open, setOpen] = useState(false);

  const form = useForm<SaveCategory>({
    resolver: zodResolver(saveCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<SaveCategory> = async (data) => {
    if (isEditing) {
      console.log('Editing category', data);
    } else {
      console.log('Creating category', data);
    }
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
        alignOffset={10}
        side="top"
        sideOffset={10}
        className="w-64 p-4"
      >
        <CategoryForm form={form} onSubmit={onSubmit} />
      </PopoverContent>
    </Popover>
  );
}
