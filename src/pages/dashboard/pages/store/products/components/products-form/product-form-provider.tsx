import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useProductForm } from '../../hooks/use-product-form-hook';
import { Button } from '@/components/ui/button';

type ProductFormProviderProps = {
  productId?: string;
  children: React.ReactNode;
};

const ProductFormProvider: React.FC<ProductFormProviderProps> = ({
  productId,
  children,
}) => {
  const { form, onSubmit, onError,isPending } = useProductForm(productId);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ProductFormProvider;
