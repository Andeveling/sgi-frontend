import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { OrderDateField } from '../fields-order-form/order-date-field';
import OrderStatusSelect from '../fields-order-form/order-status-select';

export const OrderSection = () => {
  return (
    <Card role="section">
      <CardHeader>
        <CardTitle>Order</CardTitle>
        <CardDescription>Create a new order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-8">
          <OrderDateField />
          <OrderStatusSelect />
        </div>
      </CardContent>
    </Card>
  );
};
