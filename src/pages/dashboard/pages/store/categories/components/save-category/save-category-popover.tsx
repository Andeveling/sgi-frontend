import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { CategoryForm } from './category-form';

export function CategoryPopover() {
  const [open, setOpen] = useState(false);

  const handleClosePopover = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="default" size="sm">
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Create new category
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        sideOffset={10}
        className="w-64 p-4"
      >
        <CategoryForm closePopover={handleClosePopover} />
      </PopoverContent>
    </Popover>
  );
}
