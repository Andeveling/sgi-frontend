import { Customer, CustomerForm } from '@/models/customer.model';

export const customerFormAdapter = (customer: Customer): CustomerForm => ({
  name: customer.name,
  email: customer.email,
  cellphone: customer.cellphone,
  identification: customer.identification,
});
