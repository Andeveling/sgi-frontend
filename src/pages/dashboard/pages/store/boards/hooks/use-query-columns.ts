import { useQuery } from '@tanstack/react-query';
import { ColumnService } from '../services/columns.service';
import { Column } from '../components/board-column';
import { Board } from '@/models/board.model';

export const useQueryColumns = (boardId: Board['id']) => {
  return useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => ColumnService.getColumns(boardId),
    initialData: [],
  });
};
