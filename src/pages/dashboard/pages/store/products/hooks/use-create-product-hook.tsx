import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { createProduct } from '../services/product.service';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();

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
