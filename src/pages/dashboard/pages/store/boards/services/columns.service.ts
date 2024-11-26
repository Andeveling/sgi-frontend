import api from "@/api/api";

export const ColumnService = {
  async createColumn(data: { title: string; boardId: string }) {
    return api.post('/columns', data);
  },
  async updateColumn(columnId: string, data: { title?: string }) {
    return api.patch(`/columns/${columnId}`, data);
  },
  async deleteColumn(columnId: string) {
    return api.delete(`/columns/${columnId}`);
  },
};
