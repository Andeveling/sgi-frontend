import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ban, CheckCheckIcon, Eye, MoreVertical } from 'lucide-react';
import { Order, OrderStatusEnum as OrderStatus } from '@/models/orders.model';
import { Link } from 'react-router-dom';

type Props = {
  order: Order;
  onComplete: (orderId: string) => void;
  onCancel: (orderId: string) => void;
};

export const OrderActionsMenu = ({ order, onComplete, onCancel }: Props) => {
  const disabledOption = order.status !== OrderStatus.enum.PENDING;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span className="sr-only">Open order menu</span>
          <MoreVertical className="h-6 w-6 mr-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Orden #{order.orderNumber}</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to={`/dashboard/${order.storeId}/orders/${order.id}`}>
            <Eye className="h-6 w-6 mr-2" />
            Ver orden
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onComplete(order.id as string)}
          disabled={disabledOption}
        >
          <CheckCheckIcon className="h-6 w-6 mr-2" />
          Completar orden
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onCancel(order.id as string)}
          disabled={disabledOption}
        >
          <Ban className="h-6 w-6 mr-2" />
          Cancelar orden
        </DropdownMenuItem>

        {/* {order.status !== OrderStatus.enum.PENDING && (
          <DropdownMenuItem disabled>
            <span>
              Esta orden no se puede modificar (Estado:{' '}
              {order.status.toLowerCase()})
            </span>
          </DropdownMenuItem>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
