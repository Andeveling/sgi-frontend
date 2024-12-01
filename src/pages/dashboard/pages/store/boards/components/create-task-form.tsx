import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

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
import { SaveTask, SaveTaskSchema } from '@/models/task.model';
import { useCreateTask } from '../hooks/use-task-hook';
import { useParams } from 'react-router-dom';

interface CreateTaskFormProps {
  columnId: string;
  position: number;
  userId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateTaskForm({
  columnId,
  position,
  userId,
  onSuccess,
  onCancel,
}: CreateTaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { boardId } = useParams();
  const createTaskMutation = useCreateTask(boardId as string);
  const form = useForm<SaveTask>({
    resolver: zodResolver(SaveTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      columnId: columnId,
      position: position,
      userId: userId,
    },
  });

  async function onSubmit(data: SaveTask) {
    try {
      setIsLoading(true);

      createTaskMutation.mutate(data);

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.log(error);
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
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormDescription>
                The title of your task. Must be between 3 and 100 characters.
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
                  placeholder="Enter task description (optional)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide additional details about the task (max 1000 characters).
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
            Create Task
          </Button>
        </div>
      </form>
    </Form>
  );
}
