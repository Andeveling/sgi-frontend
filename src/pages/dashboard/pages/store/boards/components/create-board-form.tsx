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
import { Textarea } from '@/components/ui/textarea';
import { SaveBoardSchema, type SaveBoard } from '@/models/board.model';
import { useBoardMutations } from '../hooks/use-board-mutations';

interface CreateBoardFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateBoardForm({ onSuccess, onCancel }: CreateBoardFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SaveBoard>({
    resolver: zodResolver(SaveBoardSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { createBoardMutation } = useBoardMutations();
  const { isPending } = createBoardMutation;

  async function onSubmit(data: SaveBoard) {
    try {
      setIsLoading(true);
      createBoardMutation.mutate(data);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter board name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your board. It must be between 3 and 100
                characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter board description (optional)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a brief description of your board (max 500 characters).
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
          <Button type="submit" disabled={isLoading || isPending}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Board
          </Button>
        </div>
      </form>
    </Form>
  );
}
