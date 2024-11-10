import { Product } from '@/models/product.model';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  product: Partial<Product>;
};

export const ProductActionsMenu = ({ product }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span className="sr-only">Open product menu</span>
          <MoreVertical className="h-6 w-6 mr-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{product.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit className="h-6 w-6" />
          <span>
            <Link to={`/dashboard/${product.storeId}/products/${product.id}/edit`}>Edit product</Link>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="h-6 w-6" />
          <span>Delete product</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
