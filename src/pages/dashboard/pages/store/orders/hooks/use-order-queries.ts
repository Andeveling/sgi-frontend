import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../services/orders.service';

export const useOrderQuery = (id: string) => {

  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
};
