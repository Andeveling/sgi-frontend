import { create, StateCreator } from 'zustand';
import { OrderItem } from '@/models/orders.model';
import { Product } from '@/models/product.model';

export type OrderItemWithProduct = OrderItem & { product: Product };

interface OrdersStore {
  orderItems: OrderItemWithProduct[];
  products: Product[];
  setProducts: (products: Product[]) => void;
  setOrderItems: (orderItems: OrderItemWithProduct[]) => void;
  addOrderItem: (orderItem: OrderItemWithProduct) => void;
  removeOrderItem: (orderItem: OrderItemWithProduct) => void;
  updateOrderItem: (orderItem: OrderItemWithProduct) => void;
  updateProductStock: (productId: string, newStock: number) => void;
}

const emptyState: OrdersStore = {
  orderItems: [],
  products: [],
  setProducts: () => {},
  setOrderItems: () => {},
  addOrderItem: () => {},
  removeOrderItem: () => {},
  updateOrderItem: () => {},
  updateProductStock: () => {},
};

const storeApi: StateCreator<OrdersStore, [], [], OrdersStore> = (set) => ({
  ...emptyState,
  setProducts: (products: Product[]) => set({ products }),

  setOrderItems: (orderItems: OrderItemWithProduct[]) => set({ orderItems }),

  addOrderItem: (orderItem: OrderItemWithProduct) =>
    set((state) => ({
      orderItems: [...state.orderItems, orderItem],
    })),

  removeOrderItem: (orderItem: OrderItemWithProduct) =>
    set((state) => ({
      orderItems: state.orderItems.filter((item) => item.id !== orderItem.id),
    })),

  updateOrderItem: (orderItem: OrderItemWithProduct) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.id === orderItem.id ? { ...item, ...orderItem } : item,
      ),
    })),

  updateProductStock: (productId: string, newStock: number) =>
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === productId && product.stock !== newStock
          ? { ...product, stock: newStock }
          : product,
      );

      if (updatedProducts === state.products) {
        return state; 
      }

      return { products: updatedProducts };
    }),
});

export const useOrdersStore = create<OrdersStore>()(storeApi);
