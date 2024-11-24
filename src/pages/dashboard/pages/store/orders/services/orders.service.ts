import api from '@/api/api';
import { Order } from '@/models/orders.model';

export const getOrders = () => api.get<Order[]>('/orders');
export const getOrder = async (id: string) =>
  api.get<Order>(`/orders/${id}`);

export const createOrder = async (order: Order) =>
  api.post<Order>('/orders', order);

export const updateOrder = async (order: Order) =>
  api.put<Order>(`/orders/${order.id}`, order);

export const deleteOrder = async (id: string) =>
  api.delete<Order>(`/orders/${id}`);
