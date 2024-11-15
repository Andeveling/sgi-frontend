import { z } from 'zod';

export const OrderStatusEnum = z.enum(['PENDING', 'FULFILLED', 'CANCELLED']);

export const OrderItemSchema = z.object({
  id: z.string().uuid().optional(),
  description: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().int().nonnegative(),
  orderId: z.string().uuid().optional(),
});

export const OrderSchema = z.object({
  id: z.string().uuid().optional(),
  invoiceNumber: z.string(),
  date: z.date().default(() => new Date()),
  totalAmount: z.number().int().nonnegative(),
  status: OrderStatusEnum.default('PENDING'),

  storeId: z.string().uuid(),
  customerId: z.string().uuid(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

  ordersItems: z.array(OrderItemSchema).optional(),
});

export const OrderFormSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderForm = z.infer<typeof OrderFormSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
