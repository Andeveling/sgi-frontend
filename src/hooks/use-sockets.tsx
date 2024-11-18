import { useOrdersStore } from '@/store/orders/orders.store';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3010');

const events = {
  productStockUpdated: 'productStockUpdated',
  productsStockUpdated: 'productsStockUpdated',
};

const useSocket = () => {
  const updateProductStock = useOrdersStore(
    (state) => state.updateProductStock,
  );

  useEffect(() => {
    socket.on(
      events.productStockUpdated,
      (data: { productId: string; newStock: number }) => {
        updateProductStock(data.productId, data.newStock);
        console.log('Single product stock updated:', data);
      },
    );

    socket.on(
      events.productsStockUpdated,
      (data: { products: { productId: string; newStock: number }[] }) => {
        data.products.forEach((product) => {
          updateProductStock(product.productId, product.newStock);
        });
        console.log('Multiple products stock updated:', data);
      },
    );

    return () => {
      socket.off(events.productStockUpdated);
      socket.off(events.productsStockUpdated);
    };
  }, [updateProductStock]);

  const subscribeToStockUpdates = (productId: string) => {
    socket.emit('subscribeToStockUpdates', { productId });
    console.log(`Subscribed to stock updates for product ${productId}`);
  };

  return { subscribeToStockUpdates };
};

export default useSocket;
