import api from '@/api/api';
import { Board, SaveBoard } from '@/models/board.model';

export const BoardService = {
  async createBoard(dataBoard: SaveBoard) {
    const res = await api.post('/boards', dataBoard);
    const data = res.data;
    return data;
  },
  async updateBoard(dataBoard: Partial<SaveBoard>) {
    const res = await api.patch(`/boards/${dataBoard.id}`, dataBoard);
    const data = res.data;
    return data;
  },
  async deleteBoard(boardId: Board['id']) {
    const res = await api.delete(`/boards/${boardId}`);
    const data = res.data;
    return data;
  },
  async getBoard(boardId: Board['id']) {
    const res = await api.get<Board>(`/boards/${boardId}`);
    const data = res.data;
    return data;
  },
  async getBoards() {
    const res = await api.get<Board[]>('/boards');
    const data = res.data;
    return data;
  },
};
