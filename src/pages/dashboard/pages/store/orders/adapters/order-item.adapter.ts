import { OrderItem } from '@/models/orders.model';

export const orderItemAdapter = (orderItem: OrderItem) => {
  return {
    quantity: orderItem.quantity,
    price: orderItem.price,
    productId: orderItem.productId,
  };
};
