import { z } from 'zod';

export const OrderStatusEnum = z.enum(['PENDING', 'FULFILLED', 'CANCELLED']);

export const OrderItemSchema = z.object({
  id: z.string().uuid().optional(),
  quantity: z.coerce.number().int().positive(),
  price: z.coerce.number().nonnegative(),
  orderId: z.string().uuid().optional(),
  productId: z.string().uuid(),
});

export const OrderSchema = z.object({
  id: z.string().uuid().optional(),
  date: z.date().default(() => new Date()),
  status: OrderStatusEnum.default('PENDING'),
  totalAmount: z.coerce.number().nonnegative(),
  orderNumber: z.string().optional(),
  storeId: z.string().uuid(),
  customerId: z.string().uuid(),

  cancelledAt: z.date().nullable(),
  fulfilledAt: z.date().nullable(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

  orderItems: z.array(OrderItemSchema).optional(),
});

export const OrderFormSchema = OrderSchema.omit({
  id: true,
  totalAmount: true,
  orderNumber: true,
  createdAt: true,
  updatedAt: true,
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderForm = z.infer<typeof OrderFormSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
