import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnService } from '../services/columns.service';
import { toast } from 'sonner';

export const useColumnMutations = () => {
  const queryClient = useQueryClient();

  const createColumnMutation = useMutation({
    mutationFn: ColumnService.createColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['columns'],
        exact: true,
      });
      toast.success('Column created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateColumnMutation = useMutation({
    mutationFn: ColumnService.updateColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['columns'],
        exact: true,
      });
      toast.success('Column updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteColumnMutation = useMutation({
    mutationFn: ColumnService.deleteColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['columns'],
        exact: true,
      });
      toast.success('Column deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createColumnMutation,
    updateColumnMutation,
    deleteColumnMutation,
  };
};
