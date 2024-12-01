import { useQuery } from '@tanstack/react-query';
import { BoardService } from '../services/board.service';
import { Board } from '@/models/board.model';

export const useBoardQuery = (boardId: Board['id']) => {
  return useQuery({
    queryKey: ['boards', boardId],
    queryFn: () => BoardService.getBoard(boardId),
  });
};
