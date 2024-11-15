import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { Option, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TableOrderOptions() {
  const store = useStoreSelected((state) => state.store);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 bg-primary">
          <Option />
          <span className="ml-2">Options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="top" align="end">
        <DropdownMenuLabel>Order Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={`/dashboard/${store.id}/orders/create`}>
            <Plus />
            Create new Order
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
