import api from "@/api/api";
import { Product, ProductFormType } from '@/models/product.model';

export const getProducts = () => {
  return api.get<Product[]>('/products');
};

export const createProduct = (data: ProductFormType) => {
  return api.post<Product>('/products', data);
};

export const getProductById = (id: string) => {
  return api.get<Product>(`/products/${id}`);
};


type UpdateProductType = ProductFormType & { id: string };
export const updateProduct = (data: UpdateProductType) => {
  const { id, ...rest } = data;
  return api.patch<Product>(`/products/${id}`, rest);
};

export const deleteProduct = (id: string) => {
  return api.delete(`/products/${id}`);
};