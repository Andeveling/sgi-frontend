import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Trash, Loader } from 'lucide-react';
import { Product } from '@/models/product.model';
import { useDeleteProduct } from '../../../hooks/use-delete-product-hook';
import { Button } from '@/components';

export const DeleteProductAction = ({ product }: { product: Product }) => {
  const { mutate, isPending } = useDeleteProduct(product.id);

  const handleDelete = () => mutate();
  return (
    <DropdownMenuItem asChild>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="mr-2 h-4 w-4" />
        ) : (
          <Trash className="mr-2 h-4 w-4" />
        )}
        Delete product
      </Button>
    </DropdownMenuItem>
  );
};
