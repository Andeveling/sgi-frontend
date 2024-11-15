import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderNumberField } from '../fields-order-form/order-number-field';
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
          <OrderNumberField />
          <OrderDateField />
          <OrderStatusSelect />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="button" className="mt-2">
          <span>Save</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
