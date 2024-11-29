import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskService } from '../services/task.service';
import { SaveTask } from '@/models/task.model';
import { toast } from 'sonner';

export const useCreateTask = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TaskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', boardId],
      });
      toast.success('Task created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateTask = ({
  taskId,
  data,
}: {
  taskId: string;
  data: SaveTask;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => TaskService.updateTask(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', taskId],
        exact: true,
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TaskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
        exact: true,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TaskService.moveTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
        exact: true,
      });
      toast.success('Task moved successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useQueryTasksByBoard = (boardId: string) => {
  return useQuery({
    queryKey: ['tasks', boardId],
    queryFn: () => TaskService.getTasksByBoard(boardId),
    initialData: [],
  });
};