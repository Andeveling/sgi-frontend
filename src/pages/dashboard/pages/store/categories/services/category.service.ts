import api from '@/api/api';
import { Category, SaveCategory } from '@/models/category.model';


export const getCategories = async () => {
  return api.get<Category[]>('/categories');
};

export const createCategory = async (data: SaveCategory) => {
  return api.post('/categories', data);
};

export const updateCategory = async (data: SaveCategory) => {
  return api.put('/categories', data);
};