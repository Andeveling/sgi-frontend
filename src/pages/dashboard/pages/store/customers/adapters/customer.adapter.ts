import { Customer, CustomerForm } from '@/models/customer.model';
import { AxiosResponse } from 'axios';

export const customerFormAdapter = (
  customer: AxiosResponse<Customer>,
): CustomerForm => {
  const { data } = customer;
  return {
    name: data.name,
    email: data.email,
    cellphone: data.cellphone,
    identification: data.identification,
  };
};
