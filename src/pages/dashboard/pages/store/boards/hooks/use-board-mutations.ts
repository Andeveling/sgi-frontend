import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BoardService } from '../services/board.service';

export const useBoardMutations = () => {
  const queryClient = useQueryClient();

  const createBoardMutation = useMutation({
    mutationFn: BoardService.createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['boards'],
        exact: true,
      });
      toast.success('Board created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: BoardService.updateBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['boards'],
        exact: true,
      });
      toast.success('Board updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: BoardService.deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['boards'],
        exact: true,
      });
      toast.success('Board deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createBoardMutation,
    updateBoardMutation,
    deleteBoardMutation,
  };
};
