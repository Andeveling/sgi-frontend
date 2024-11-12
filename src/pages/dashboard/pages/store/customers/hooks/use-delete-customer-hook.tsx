import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCustomer } from '../services/customers.service';
import { toast } from 'sonner';

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer deleted successfully');
    },
    onError: (error) => {
      toast.error(`Customer deletion failed: ${error.message}`);
    },
  });
};
