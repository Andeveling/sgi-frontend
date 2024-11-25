import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelOrder, completeOrder } from '../services/orders.service';
import { toast } from 'sonner';

export const useOrderMutations = () => {
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationKey: ['cancelOrder'],
    mutationFn: cancelOrder,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });

      toast.success('La orden ha sido cancelada exitosamente');
    },
    onError: (error) => {
      console.log(error);
      toast.error('La orden no pudo ser cancelada');
    },
  });

  const completeOrderMutation = useMutation({
    mutationKey: ['completeOrder'],
    mutationFn: completeOrder,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    cancelOrderMutation,
    completeOrderMutation,
  };
};
