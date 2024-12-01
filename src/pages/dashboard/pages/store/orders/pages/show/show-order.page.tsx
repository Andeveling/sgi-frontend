import { useParams } from 'react-router-dom';
import { useOrderQuery } from '../../hooks/use-order-queries';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  XCircleIcon,
  PackageIcon,
  CalendarIcon,
  DollarSignIcon,
  ClockIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import { format } from 'date-fns';
import { OrderStatus } from '@/models/orders.model';
import { formatCurrency } from '@/utilities/currency-util';

export default function ShowOrderPage() {
  const { orderId } = useParams();
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useOrderQuery(orderId as string);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Order #{order?.orderNumber}</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <OrderStatusBadge status={order?.status as OrderStatus} />
                <div>
                  <dt className="font-medium text-gray-500">Order Date</dt>
                  <dd className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {order?.date ? format(new Date(order.date), 'PPP') : '-'}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Total Amount</dt>
                  <dd className="flex items-center">
                    <DollarSignIcon className="w-4 h-4 mr-1" />$
                    {order?.totalAmount.toFixed(2)}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">
                    {order?.status === 'CANCELLED'
                      ? 'Cancelled At'
                      : order?.status === 'FULFILLED'
                        ? 'Fulfilled At'
                        : 'Created At'}
                  </dt>
                  <dd className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {order?.status === 'CANCELLED' && order.cancelledAt
                      ? format(new Date(order.cancelledAt), 'PPP')
                      : order?.fulfilledAt
                        ? format(new Date(order.fulfilledAt), 'PPP')
                        : 'Unknown date'}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Total Items:</span>
                <span>
                  {order?.orderItems &&
                    order?.orderItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    )}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Total Amount:</span>
                <span>{formatCurrency(order?.totalAmount)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ShoppingCartIcon className="w-4 h-4 mr-1" />
                {order?.orderItems && order.orderItems.length} unique products
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.orderItems?.length ? (
                  order.orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.productId}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No items found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  return (
    <div>
      <dt className="font-medium text-gray-500">Status</dt>
      <dd>
        <Badge>
          {status === 'CANCELLED' ? (
            <XCircleIcon className="w-4 h-4 mr-1" />
          ) : (
            <PackageIcon className="w-4 h-4 mr-1" />
          )}
          {status}
        </Badge>
      </dd>
    </div>
  );
};
