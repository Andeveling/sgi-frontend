import { CreateProduct, CreateProductSchema } from '@/models/product.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../services/product.service';

export const useEditPage = () => {
  const { productId } = useParams();
  const {
    data: product,
    isPending,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId ?? ''),
  });

  const form = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (product?.data) {
      form.reset({
        name: product.data?.name || '',
        buyPrice: product.data?.buyPrice || 0,
        sellPrice: product.data?.sellPrice || 0,
        stock: product.data?.stock || 0,
        description: product.data?.description || '',
        minStock: product.data?.minStock || 0,
        categoryId: product.data?.categoryId || '',
        storeId: product.data?.storeId || '',
      });
    }
  }, [product, form]);

    console.log(product?.data)
    console.log(form)
  return {
    form,
    isPending,
    error,
  };
};
