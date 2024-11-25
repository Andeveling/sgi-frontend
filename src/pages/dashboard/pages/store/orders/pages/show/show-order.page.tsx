import { useParams } from 'react-router-dom';
import { useOrderQuery } from '../../hooks/use-order-queries';
import { format } from 'date-fns';
import {
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  PackageIcon,
  ShoppingCartIcon,
  XCircleIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '../../../../../../../models/product.model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ShowOrderPage() {
  const { orderId } = useParams();
  const { data: order } = useOrderQuery(orderId as string);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Order #{order?.orderNumber}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-gray-500">Status</dt>
                <dd>
                  <Badge
                    variant={
                      order?.status === 'CANCELLED' ? 'destructive' : 'default'
                    }
                  >
                    {order?.status === 'CANCELLED' ? (
                      <XCircleIcon className="w-4 h-4 mr-1" />
                    ) : (
                      <PackageIcon className="w-4 h-4 mr-1" />
                    )}
                    {order?.status}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Order Date</dt>
                <dd className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  {format(new Date(order.date), 'PPP')}
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
                    : 'Created At'}
                </dt>
                <dd className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {format(
                    new Date(
                      order?.status === 'CANCELLED'
                        ? order.cancelledAt
                        : order.createdAt,
                    ),
                    'PPP',
                  )}
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
                {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Total Amount:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ShoppingCartIcon className="w-4 h-4 mr-1" />
              {order.orderItems.length} unique products
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
              {order.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
