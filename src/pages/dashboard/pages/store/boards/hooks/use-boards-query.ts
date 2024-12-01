import { useQuery } from '@tanstack/react-query';
import { BoardService } from '../services/board.service';

export const useBoardsQuery = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: BoardService.getBoards,
    initialData: [],
  });
};
