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
import CustomersForm from '../../customers-form/customers-form';
import { Modal } from '@/components/modal/modal-form';

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
            <span className="sr-only">Open product menu</span>
            <MoreVertical className="h-6 w-6 mr-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{customer.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button variant="ghost" size="sm" onClick={openModal}>
              <Edit className="h-6 w-6" />
              <span>Edit customer</span>
            </Button>
          </DropdownMenuItem>
          {/* <DeleteProductAction product={product} /> */}
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal
        title="Edit customer"
        description="Edit a customer"
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <CustomersForm customer={customer} />
      </Modal>
    </>
  );
};
