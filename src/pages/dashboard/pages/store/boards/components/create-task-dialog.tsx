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
import { CreateTaskForm } from './create-task-form';

interface CreateTaskDialogProps {
  columnId: string;
  position: number;
}

export function CreateTaskDialog({
  columnId,
  position,
}: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Task</DialogTitle>
          <DialogDescription>
            Add a new task to this column in your board.
          </DialogDescription>
        </DialogHeader>
        <CreateTaskForm
          columnId={columnId}
          position={position}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
