import { useQuery } from '@tanstack/react-query';
import { MovementService } from '../services/movement.service';

export const useMovementsQuery = (storeId: string) => {
  return useQuery({
    queryKey: ['movements', storeId],
    queryFn: () => MovementService.getMovements(storeId),
    initialData: [],
  });
};
