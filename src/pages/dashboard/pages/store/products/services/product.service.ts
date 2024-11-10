import api from "@/api/api";
import { CreateProduct, Product,UpdateProduct } from "@/models/product.model";

export const getProducts = () => {
  return api.get<Product[]>('/products');
};

export const createProduct = (data: CreateProduct) => {
  return api.post<Product>('/products', data);
};

export const getProductById = (id: string) => {
  return api.get<Product>(`/products/${id}`);
};

export const updateProduct = (data: UpdateProduct) => {
  const { id, ...rest } = data;
  return api.patch<Product>(`/products/${id}`, rest);
};