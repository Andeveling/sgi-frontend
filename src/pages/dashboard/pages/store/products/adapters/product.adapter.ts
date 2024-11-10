import { Product, ProductFormType } from '@/models/product.model';
import { AxiosResponse } from 'axios';

export const productFormAdapter = (
  product: AxiosResponse<Product>,
): ProductFormType => {
  const { data } = product;
  return {
    name: data.name,
    buyPrice: data.buyPrice,
    sellPrice: data.sellPrice,
    stock: data.stock,
    storeId: data.storeId,
    minStock: data.minStock,
    description: data.description,
    expiration: data.expiration ? new Date(data.expiration) : undefined,
    categoryId: data.categoryId,
  };
};
