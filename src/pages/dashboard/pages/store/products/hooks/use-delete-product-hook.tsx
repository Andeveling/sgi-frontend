import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteProduct } from '../services/product.service';

export const useDeleteProduct = (productId: string) => {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product deleted successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        },
  });
};
