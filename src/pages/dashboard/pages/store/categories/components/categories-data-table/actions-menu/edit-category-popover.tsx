import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Category } from '@/models/category.model';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { CategoryForm } from '../../save-category/category-form';

interface EditCategoryPopoverProps {
  category: Category;
}

export default function EditCategoryPopover({
  category,
}: EditCategoryPopoverProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const closePopover = () => setIsEditOpen(false);

  return (
    <Popover open={isEditOpen} onOpenChange={setIsEditOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 text-primary">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <CategoryForm isEditing initialData={category} closePopover={closePopover} />
      </PopoverContent>
    </Popover>
  );
}
