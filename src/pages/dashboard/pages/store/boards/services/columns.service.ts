import api from '@/api/api';
import { SaveColumn } from '@/models/column.model';

export const ColumnService = {

  async getColumns(boardId: string) {
    const res = await api.get(`/columns/board/${boardId}`);
    const data = res.data;
    return data;
  },

  async createColumn(data: SaveColumn) {
    return api.post('/columns', data);
  },
  async updateColumn(data: Partial<SaveColumn>) {
    return api.patch(`/columns/${data.id}`, data);
  },
  async deleteColumn(columnId: string) {
    return api.delete(`/columns/${columnId}`);
  },
};
