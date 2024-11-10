import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/models/product.model';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ProductActionsMenu } from './actions-menu/produt-actions-menu';
import { formatCurrency } from '@/utilities/currency-util';
import { Link } from 'react-router-dom';

export const productsColumns: ColumnDef<Partial<Product>>[] = [
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
    accessorKey: 'buyPrice',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Buy Price"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{formatCurrency(row.original.buyPrice)}</div>
    ),
  },
  {
    accessorKey: 'sellPrice',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Sell Price"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{formatCurrency(row.original.sellPrice)}</div>
    ),
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" className="justify-center" />
    ),
    cell: ({ row }) => <div className="text-center">{row.original.stock}</div>,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <Link className='text-primary' to={`/dashboard/${row.original.storeId}/categories`}>
        {row.original.category.name}
      </Link>
    ),
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
      const product = row.original;
      return <ProductActionsMenu product={product} />;
    },
  },
];
