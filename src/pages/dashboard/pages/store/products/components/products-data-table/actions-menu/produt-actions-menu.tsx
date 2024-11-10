import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/models/product.model';
import { Edit, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DeleteProductAction } from './delete-product-action';

type Props = {
  product: Product;
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
            <Link
              to={`/dashboard/${product.storeId}/products/${product.id}/edit`}
            >
              Edit product
            </Link>
          </span>
        </DropdownMenuItem>
        <DeleteProductAction product={product} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
