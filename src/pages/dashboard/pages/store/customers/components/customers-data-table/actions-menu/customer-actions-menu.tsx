import { Modal } from '@/components/modal/modal-form';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Customer } from '@/models/customer.model';
import { Edit, MoreVertical } from 'lucide-react';
import { useCustomerForm } from '../../../hooks/use-customer-form';
import { DeleteCustomerAction } from './delete-customer-action';
import { EditCustomerForm } from '../../customers-form/edit-customer-form';

type Props = {
  customer: Customer;
};

export const CustomerActionsMenu = ({ customer }: Props) => {
  const { isOpen, closeModal, openModal } = useCustomerForm({ customer });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <span className="sr-only">Open customer menu</span>
            <MoreVertical className="h-6 w-6 mr-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{customer.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openModal} className="cursor-pointer">
            <Edit className="h-6 w-6" />
            Edit customer
          </DropdownMenuItem>
          <DeleteCustomerAction customer={customer} />
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal
        title="Edit customer"
        description="Edit a customer"
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <EditCustomerForm customer={customer} closeModal={closeModal} />
      </Modal>
    </>
  );
};
