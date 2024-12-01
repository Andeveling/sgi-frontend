import { useQuery } from '@tanstack/react-query';
import { ColumnService } from '../services/columns.service';
import { Board } from '@/models/board.model';

export const useQueryColumns = (boardId: Board['id']) => {
  return useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => ColumnService.getColumns(boardId),
    initialData: [],
  });
};
