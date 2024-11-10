import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createProduct } from '../../../services/product.service';
import { useParams, useNavigate } from 'react-router-dom';

export const useCreateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
      navigate(`/dashboard/${params.storeId}/products`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
