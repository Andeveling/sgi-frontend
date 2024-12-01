import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomer } from '../services/customers.service';
import { toast } from 'sonner';

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer created successfully');
    },
    onError: (error) => {
      toast.error(`Customer creation failed: ${error.message}`);
    },
  });
};
