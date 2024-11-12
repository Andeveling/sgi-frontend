import CreateButton from '@/components/create-button/create-button';
import { Modal } from '@/components/modal/modal-form';
import { useCustomerForm } from '../../hooks/use-customer-form';
import CustomersForm from '../customers-form/customers-form';


export default function CreateCustomerModal() {
  const { openModal, isOpen, closeModal } = useCustomerForm({
    customer: undefined,
  });
  return (
    <>
      <CreateButton onClick={openModal} entityName="Customer" />
      <Modal
        title="Create Customer"
        description="Add a new customer to your inventory management system."
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <CustomersForm />
      </Modal>
    </>
  );
}
