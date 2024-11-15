import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { Order } from '@/models/orders.model';
import { formatCurrency } from '@/utilities/currency-util';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { CheckCircleIcon, ClockIcon, X } from 'lucide-react';

export const ordersColumns: ColumnDef<Order>[] = [
  {
    id: 'select',
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
      <DataTableColumnHeader column={column} title="Order Number" />
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
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
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      const statusConfig = {
        PENDING: {
          color: 'yellow',
          icon: <ClockIcon size={18} />,
          label: 'Pendiente',
        },
        CANCELLED: {
          color: 'error',
          icon: <X size={18} />,
          label: 'Pagada',
        },
        FULFILLED: {
          color: 'green',
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
        <Badge
          color={currentStatus.color}
          variant="outline"
          className="p-1 px-2"
        >
          {currentStatus.icon}{' '}
          <span className="ml-1"> {currentStatus.label}</span>
        </Badge>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original;
      return <button type="button">Actions</button>;
    },
  },
];
