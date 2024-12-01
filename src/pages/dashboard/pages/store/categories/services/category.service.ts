import api from '@/api/api';
import { Category, SaveCategory } from '@/models/category.model';

export const getCategories = async () => {
  return api.get<Category[]>('/categories');
};

export const createCategory = async (data: SaveCategory) => {
  const newCategory = { storeId: data.storeId, name: data.name };
  return api.post('/categories', newCategory);
};

export const updateCategory = async (data: SaveCategory) => {
  const { id, ...rest } = data;
  return api.patch(`/categories/${id}`, rest);
};

export const deleteCategory = async (id: string) => {
  return api.delete(`/categories/${id}`);
};
