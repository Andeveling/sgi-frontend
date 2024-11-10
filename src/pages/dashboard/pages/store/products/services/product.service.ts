import api from "@/api/api";
import { CreateProduct, Product } from "@/models/product.model";

export const getProducts = () => {
  return api.get<Product[]>('/products');
};

export const createProduct = (data: CreateProduct) => {
  return api.post("/products", data);
};