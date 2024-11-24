import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getProducts } from '@/pages/dashboard/pages/store/products/services/product.service';
import { useQuery } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  OrderItemWithProduct,
  useOrdersStore,
} from '@/store/orders/orders.store';
import AddItemModal from './order-item-modal-form';
import useSocket from '@/hooks/use-sockets';
import { formatCurrency } from '@/utilities/currency-util';

export const OrderItemsTableSection = () => {
  const orderItems = useOrdersStore((state) => state.orderItems);
  const removeOrderItem = useOrdersStore((state) => state.removeOrderItem);
  const setProducts = useOrdersStore((state) => state.setProducts);
  const updateProductStock = useOrdersStore(
    (state) => state.updateProductStock,
  );

  const { subscribeToStockUpdates } = useSocket();
  const [subscribedProducts, setSubscribedProducts] = useState<Set<string>>(
    new Set(),
  );

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (data) {
      setProducts(data.data);
    }
  }, [data]);

  useEffect(() => {
    orderItems.forEach((item) => {
      if (!subscribedProducts.has(item.productId)) {
        subscribeToStockUpdates(item.productId);
        setSubscribedProducts((prev) => new Set(prev).add(item.productId));
      }
    });
  }, [orderItems, subscribeToStockUpdates, subscribedProducts]);

  const handleDeleteItem = (orderItem: OrderItemWithProduct) => {
    const { id } = orderItem;
    const itemToRemove = orderItems.find((item) => item.id === id);
    if (itemToRemove) {
      // Restaurar el stock del producto al eliminar un ítem
      updateProductStock(
        itemToRemove.productId,
        itemToRemove.product.stock + itemToRemove.quantity,
      );
      removeOrderItem(orderItem);
    }
  };

  // Cálculo de totales
  const subtotal = useMemo(
    () => orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [orderItems],
  );

  const taxes = useMemo(() => subtotal * 0.1, [subtotal]);
  const total = useMemo(() => subtotal + taxes, [subtotal, taxes]);

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex justify-between">
          <div>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>Add your order items</CardDescription>
          </div>
          <div>
            <AddItemModal />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="container mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Product Name</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderItems?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="align-top">
                    <div className="font-medium">{item.product.name}</div>
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.price}</TableCell>
                  <TableCell className="text-right">
                    ${item.quantity * item.price}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteItem(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="font-medium text-right">
                  Subtotal
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(subtotal)}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="font-medium text-right">
                  Impuestos
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(taxes)}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} className="font-bold text-right text-lg">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold text-base">
                  {formatCurrency(total)}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
