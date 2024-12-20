import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { SelectCustomerField } from '../fields-order-form/select-customer-field';

export const CustomerOrderSection = () => {
  return (
    <Card role="section">
      <CardHeader>
        <CardTitle>Customer</CardTitle>
        <CardDescription>Set the customer of the order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <SelectCustomerField />
        </div>
      </CardContent>
    </Card>
  );
};
