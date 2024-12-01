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
import { Customer } from '@/models/customer.model';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { useDeleteCustomer } from '../../../hooks/use-delete-customer-hook';

export const DeleteCustomerAction = ({ customer }: { customer: Customer }) => {
  const { mutate } = useDeleteCustomer();
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => mutate(customer.id);

  return (
    <Fragment>
      <DropdownMenuItem asChild>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Trash className="h-4 w-4" />
              Delete customer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete customer</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this customer?
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
