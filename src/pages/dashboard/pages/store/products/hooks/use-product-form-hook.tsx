import {
  ProductFormType,
  ProductFormSchema,
  Product,
} from '@/models/product.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { getProductById } from '../services/product.service';
import { productFormAdapter } from '../adapters/product.adapter';
import { useUpdateProduct } from './use-update-product-hook';
import { useCreateProduct } from './use-create-product-hook';

export const useProductForm = (productId: Product['id'] | undefined) => {
  const form = useForm<ProductFormType>({
    defaultValues: {
      name: '',
      buyPrice: 0,
      sellPrice: 0,
      stock: 0,
      description: '',
      minStock: 0,
      categoryId: '',
      storeId: '',
    },
    resolver: zodResolver(ProductFormSchema),
  });

  const updateProductMutation = useUpdateProduct();
  const createProductMutation = useCreateProduct();
  const isPending =
    updateProductMutation.isPending || createProductMutation.isPending;

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((product) => {
        form.reset(productFormAdapter(product));
      });
    }
  }, [productId, form.reset]);

  const onSubmit: SubmitHandler<ProductFormType> = async (data) => {
    if (productId) {
      updateProductMutation.mutate({ ...data, id: productId });
    } else {
      createProductMutation.mutate(data);
    }
  };

  const onError: SubmitErrorHandler<ProductFormType> = (errors) => {
    console.log(errors);
  };

  return {
    form,
    onSubmit,
    onError,
    isPending,
  };
};
