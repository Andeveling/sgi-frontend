import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  Movement,
  MovementType
} from '@/models/movement.model';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine, Package } from 'lucide-react';

const getBadgeProps = (type: MovementType) => {
  switch (type) {
    case 'INITIAL_STOCK':
      return {
        bgColor: 'bg-gray-200 text-gray-800',
        icon: Package,
        label: 'Initial Stock',
      };
    case 'PURCHASE':
      return {
        bgColor: 'bg-green-200 text-green-800',
        icon: ArrowDownToLine,
        label: 'Purchase',
      };
    case 'SALE':
      return {
        bgColor: 'bg-red-200 text-red-800',
        icon: ArrowUpFromLine,
        label: 'Sale',
      };
    case 'TRANSFER':
      return {
        bgColor: 'bg-blue-200 text-blue-800',
        icon: ArrowLeftRight,
        label: 'Transfer',
      };
    default:
      return {
        bgColor: 'bg-gray-200 text-gray-800',
        icon: Package,
        label: 'Unknown',
      };
  }
};

export const movementsColumns: ColumnDef<Movement>[] = [
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
    accessorKey: 'Product',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => row.original.product?.name || 'N/A',
  },
  {
    accessorKey: 'Type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const { bgColor, icon: Icon, label } = getBadgeProps(row.original.type);
      return (
        <Badge variant='outline' className={cn(bgColor)}>
          <Icon className="mr-1 h-3 w-3" />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'Quantity',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Quantity"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.quantity}</div>
    ),
  },
  {
    accessorKey: 'Date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return date ? format(date, 'dd/MM/yyyy') : 'N/A';
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const movement = row.original;
      return (
        <div className="flex items-center gap-2">
          <button className="btn btn-primary">Edit</button>
        </div>
      );
    },
  },
];
