import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Table } from '@tanstack/react-table';

interface SearchInputProps<TData> {
  table: Table<TData>;
}

export const SearchInput = <TData,>({
  table,
}: SearchInputProps<TData>): JSX.Element => {
  const nameColumn = table.getColumn('name');

  return (
    <div className="relative max-w-sm">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        <Search className="w-4 h-4" />
      </span>
      <Input
        placeholder="Filter name..."
        value={(nameColumn?.getFilterValue() as string) ?? ''}
        onChange={(event) => {
          if (nameColumn) {
            nameColumn.setFilterValue(event.target.value);
          }
        }}
        className="pl-10"
      />
    </div>
  );
};
