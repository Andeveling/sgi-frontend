'use client';

import { Kanban } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { CreateBoardForm } from './create-board-form';
import { useState } from 'react';

interface CreateBoardDialogProps {
  isSuperAdmin: boolean | undefined;
}

export function CreateBoardDialog({ isSuperAdmin }: CreateBoardDialogProps) {
  const [open, setOpen] = useState(false);

  if (!isSuperAdmin) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Kanban className="mr-2 h-4 w-4" />
            Create a board
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Board</DialogTitle>
          <DialogDescription>
            Create a new board to organize your tasks and collaborate with your
            team.
          </DialogDescription>
        </DialogHeader>
        <CreateBoardForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
