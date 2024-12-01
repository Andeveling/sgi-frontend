import api from '@/api/api';
import { Customer, CustomerForm } from '@/models/customer.model';

export const getCustomers = () => api.get<Customer[]>('/customers');
export const getCustomerById = (id: string) =>
  api.get<Customer>(`/customers/${id}`);
export const createCustomer = (customer: CustomerForm) =>
  api.post<Customer>('/customers', customer);

type UpdateCustomerType = CustomerForm & { id: string };
export const updateCustomer = (customer: UpdateCustomerType) => {
  const { id, ...rest } = customer;
  return api.patch<Customer>(`/customers/${customer.id}`, rest);
};
export const deleteCustomer = (id: string) =>
  api.delete<Customer>(`/customers/${id}`);
