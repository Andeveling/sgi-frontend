import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SaveColumn, SaveColumnSchema } from '@/models/column.model';
import { useColumnMutations } from '../hooks/use-column-mutations';

interface CreateColumnFormProps {
  boardId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateColumnForm({
  boardId,
  onSuccess,
  onCancel,
}: CreateColumnFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { createColumnMutation } = useColumnMutations(boardId);

  const form = useForm<SaveColumn>({
    resolver: zodResolver(SaveColumnSchema),
    defaultValues: {
      title: '',
      position: 0,
      boardId: boardId,
    },
  });

  async function onSubmit(data: SaveColumn) {
    try {
      setIsLoading(true);

      createColumnMutation.mutate(data);

      form.reset();
      onSuccess?.();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter column title" {...field} />
              </FormControl>
              <FormDescription>
                The title of your column. Must be between 3 and 100 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Column
          </Button>
        </div>
      </form>
    </Form>
  );
}
