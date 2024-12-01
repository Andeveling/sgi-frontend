import CreateButton from '@/components/create-button/create-button';
import { Modal, useModal } from '@/components/modal/modal-form';
import { CreateCustomerForm } from '../customers-form/create-customer-form';

export default function CreateCustomerModal() {
  const { openModal, isOpen, closeModal } = useModal();
  return (
    <>
      <CreateButton onClick={openModal} entityName="Customer" />
      <Modal
        title="Create Customer"
        description="Add a new customer to your inventory management system."
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <CreateCustomerForm closeModal={closeModal} />
      </Modal>
    </>
  );
}
