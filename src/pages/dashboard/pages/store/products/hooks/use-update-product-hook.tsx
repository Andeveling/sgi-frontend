import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { updateProduct } from '../services/product.service';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
      navigate(`/dashboard/${params.storeId}/products`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
