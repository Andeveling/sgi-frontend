import { Button } from '@/components';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Product } from '@/models/product.model';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { useDeleteProduct } from '../../../hooks/use-delete-product-hook';

export const DeleteProductAction = ({ product }: { product: Product }) => {
  const { mutate } = useDeleteProduct(product.id);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => mutate();

  return (
    <Fragment>
      <DropdownMenuItem asChild>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Trash className="h-4 w-4" />
              Delete product
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this product?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuItem>
    </Fragment>
  );
};
