import api from '@/api/api';
import { Movement } from '@/models/movement.model';
import { Store } from '@/models/store.model';

export const MovementService = {
  getMovements: async (storeId: Store['id']) => {
    const res = await api.get<Movement[]>(`/movements/${storeId}`);
    return res.data;
  },
};
