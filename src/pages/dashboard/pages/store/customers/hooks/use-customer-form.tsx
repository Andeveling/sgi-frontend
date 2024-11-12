import { Customer, CustomerForm, CustomerFormSchema } from '@/models/customer.model';
import { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateCustomer } from './use-update-customer';
import { useCreateCustomer } from './use-create-customer-hook';
import { useModal } from '@/components/modal/modal-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCustomerForm = ({ customer }: { customer?: Customer }) => {
  const defaultValues = {
    name: customer?.name || '',
    email: customer?.email || '',
    cellphone: customer?.cellphone || '',
    identification: customer?.identification || '',
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [customer]);

  const isEdit = customer?.id !== undefined;

  const updateMutation = useUpdateCustomer();
  const createMutation = useCreateCustomer();

  const form = useForm<CustomerForm>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues
  });

  const onSubmit: SubmitHandler<CustomerForm> = (data) => {
    if (isEdit) {
      updateMutation.mutate({ ...data, id: customer.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const onError: SubmitErrorHandler<CustomerForm> = (errors) => {
    console.log(errors);
  };

  const { openModal, isOpen, closeModal } = useModal();

  return {
    form,
    isEdit,
    onSubmit,
    onError,
    openModal,
    isOpen,
    closeModal,
  };
};
