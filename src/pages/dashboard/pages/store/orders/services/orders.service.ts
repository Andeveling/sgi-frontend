import api from '@/api/api';
import { Order, } from '@/models/orders.model';

export const getOrders = async () => api.get<Order[]>('/api/orders');
export const getOrder = async (id: string) =>
    api.get<Order>(`/api/orders/${id}`);

export const createOrder = async (order: Order) =>
    api.post<Order>('/api/orders', order);

export const updateOrder = async (order: Order) =>
    api.put<Order>(`/api/orders/${order.id}`, order);

export const deleteOrder = async (id: string) =>
    api.delete<Order>(`/api/orders/${id}`);