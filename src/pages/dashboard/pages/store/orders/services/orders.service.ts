import api from '@/api/api';
import { Order } from '@/models/orders.model';

export const getOrders = () => api.get<Order[]>('/orders');
export const getOrder = async (id: string) => {
  const res = await api.get<Order>(`/orders/${id}`);
  return res.data;
};

export const createOrder = async (order: Order) =>
  api.post<Order>('/orders', order);

export const updateOrder = async (order: Order) =>
  api.put<Order>(`/orders/${order.id}`, order);

export const deleteOrder = async (id: string) =>
  api.delete<Order>(`/orders/${id}`);

export const completeOrder = async (id: string) =>
  api.patch<Order>(`/orders/${id}/fulfill`);

export const cancelOrder = async (id: string) =>
  api.patch<Order>(`/orders/${id}/cancel`);
