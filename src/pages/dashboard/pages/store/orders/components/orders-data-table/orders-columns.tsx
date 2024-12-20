import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Order } from '@/models/orders.model';
import { formatCurrency } from '@/utilities/currency-util';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CheckCircleIcon, ClockIcon, X } from 'lucide-react';
import { useOrderMutations } from '../../hooks/use-order-mutations';
import { OrderActionsMenu } from './actions-menu/order-actions-menu';

export const ordersColumns: ColumnDef<Order>[] = [
  {
    id: 'select',
    accessorKey: 'check',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => (
      <div className="grid justify-center">
        <DataTableColumnHeader
          column={column}
          title="No"
          className=" self-justify-center"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.orderNumber}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div>
          {order.date ? format(new Date(order.date), 'dd/MM/yyyy') : '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'fulfilledAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Fulfilled At"
        className="justify-center"
      />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-center">
          {order.fulfilledAt ? format(order.fulfilledAt, 'dd/MM/yyyy') : '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'cancelledAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Cancelled At"
        className="justify-center"
      />
    ),
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="text-center">
          {order.cancelledAt ? format(order.cancelledAt, 'dd/MM/yyyy') : '-'}
        </div>
      );
    },
  },

  {
    accessorKey: 'totalAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Amount"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">
        {formatCurrency(row.original.totalAmount)}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="justify-center"
      />
    ),
    cell: ({ row }) => {
      const order = row.original;
      const statusConfig = {
        PENDING: {
          color: 'bg-orange-500',
          icon: <ClockIcon size={18} />,
          label: 'Pendiente',
        },
        CANCELLED: {
          color: 'bg-red-500',
          icon: <X size={18} />,
          label: 'Cancelada',
        },
        FULFILLED: {
          color: 'bg-green-500',
          icon: <CheckCircleIcon size={18} />,
          label: 'Completada',
        },
      };
      const currentStatus = statusConfig[order.status] || {
        color: 'gray',
        icon: null,
        label: order.status,
      };

      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={cn('p-1 px-2', currentStatus.color)}
          >
            {currentStatus.icon}{' '}
            <span className="ml-1"> {currentStatus.label}</span>
          </Badge>
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original;
      const { cancelOrderMutation, completeOrderMutation } =
        useOrderMutations();
      return (
        <OrderActionsMenu
          onComplete={(orderId) => {
            const confirmed = window.confirm(
              '¿Estás seguro de completar esta orden?',
            );
            if (!confirmed) return;
            completeOrderMutation.mutate(orderId);
          }}
          onCancel={async (orderId) => {
            const confirmed = window.confirm(
              '¿Estás seguro de cancelar esta orden?',
            );
            if (!confirmed) return;
            cancelOrderMutation.mutate(orderId);
          }}
          order={order}
        />
      );
    },
  },
];
