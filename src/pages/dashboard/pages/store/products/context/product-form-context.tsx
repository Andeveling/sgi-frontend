import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProductFormType,
  ProductFormSchema,
  Product,
} from '@/models/product.model';
import { getProductById } from '../services/product.service';
import { productFormAdapter } from '../adapters/product.adapter';
import { SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useUpdateProduct } from '../hooks/use-update-product-hook';
import { useCreateProduct } from '../hooks/use-create-product-hook';

// Definir el tipo de contexto del formulario
interface ProductFormContextT {
  form: UseFormReturn<ProductFormType>;
  onSubmit: SubmitHandler<ProductFormType>;
  onError: SubmitErrorHandler<ProductFormType>;
  isPending: boolean;
  isEdit: boolean;
}

const ProductFormContext = createContext<ProductFormContextT | undefined>(
  undefined,
);

type ProductFormProviderProps = {
  productId?: Product['id'];
  children: ReactNode;
};

export const ProductFormProvider: React.FC<ProductFormProviderProps> = ({
  productId,
  children,
}) => {
  const form = useForm<ProductFormType>({
    defaultValues: {
      name: '',
      buyPrice: 0,
      sellPrice: 0,
      stock: 0,
      description: '',
      minStock: 0,
      maxStock: 0,
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

  const isEdit = productId !== undefined;

  return (
    <ProductFormContext.Provider
      value={{ form, onSubmit, onError, isPending, isEdit }}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>{children}</form>
      </FormProvider>
    </ProductFormContext.Provider>
  );
};

export const useProductFormContext = () => {
  const context = useContext(ProductFormContext);
  if (!context) {
    throw new Error(
      'useProductFormContext debe usarse dentro de ProductFormProvider',
    );
  }
  return context;
};
