import api from '@/api/api';
import { CreateStoreType } from '../schemas/first-store-form.schema';

export const createStore = async (data: CreateStoreType) => {
  return api.post('/stores', data);
};
