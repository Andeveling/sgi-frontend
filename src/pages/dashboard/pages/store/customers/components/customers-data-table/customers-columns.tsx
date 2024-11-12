import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Customer } from '@/models/customer.model';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { CustomerActionsMenu } from './actions-menu/customer-actions-menu';

export const customersColumns: ColumnDef<Customer>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    cell: ({ row }) => {
      const handleClick = () => {
        navigator.clipboard.writeText(row.original.email);
        toast.success('Email copied to clipboard');
      };
      return (
        <div className="flex items-center gap-2 ">
          {row.original.email}
          <Button variant="ghost" size="sm" onClick={handleClick}>
            <Copy size={18} />
            <span className="sr-only">Copy email</span>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'cellphone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cellphone" />
    ),
    cell: ({ row }) => {
      const handleClick = () => {
        navigator.clipboard.writeText(row.original.cellphone);
        toast.success('Cellphone copied to clipboard');
      };
      return (
        <div className="flex items-center gap-2 ">
          {row.original.cellphone}
          <Button variant="ghost" size="sm" onClick={handleClick}>
            <Copy size={18} />
            <span className="sr-only">Copy cellphone</span>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => format(row.original.createdAt, 'dd/MM/yyyy'),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => format(row.original.createdAt, 'dd/MM/yyyy'),
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const customer = row.original;
      return <CustomerActionsMenu customer={customer} />;
    },
  },
];
