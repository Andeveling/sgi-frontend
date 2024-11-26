import api from "@/api/api";

export const BoardService = {
  async createBoard(data: { name: string; description?: string }) {
    return api.post('/boards', data);
  },
  async updateBoard(
    boardId: string,
    data: { name?: string; description?: string },
  ) {
    return api.patch(`/boards/${boardId}`, data);
  },
  async deleteBoard(boardId: string) {
    return api.delete(`/boards/${boardId}`);
  },
  async getBoard(boardId: string) {
    return api.get(`/boards/${boardId}`);
  },
  async getBoards() {
    return api.get('/boards');
  },
};
