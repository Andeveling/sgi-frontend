import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateColumnForm } from './create-column-form';
import { useColumnMutations } from '../hooks/use-column-mutations';

interface CreateColumnDialogProps {
  boardId: string;
}

export function CreateColumnDialog({ boardId }: CreateColumnDialogProps) {
  const [open, setOpen] = useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Create a column
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Column</DialogTitle>
          <DialogDescription>
            Add a new column to organize your tasks in this board.
          </DialogDescription>
        </DialogHeader>
        <CreateColumnForm
          boardId={boardId}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
