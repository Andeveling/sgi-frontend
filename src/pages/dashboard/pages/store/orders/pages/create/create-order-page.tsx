import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import PageContainer from '@/components/page-container/page-container';
import {
  OrderForm,
  OrderFormSchema,
  OrderStatusEnum,
} from '@/models/orders.model';
import { OrderFormProvider } from '../../components/orders-data-table/order-form/order-form-context';
import { CustomerOrderSection } from '../../components/orders-data-table/order-form/sections-order-form/customer-order-section';
import { OrderItemsSection } from '../../components/orders-data-table/order-form/sections-order-form/order-items-section';
import { OrderSection } from '../../components/orders-data-table/order-form/sections-order-form/order-section';

export default function CreateOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      date: new Date(),
      status: 'PENDING',
      ordersItems: [{ productId: '', quantity: 1 }],
    },
  });

  const onSubmit = async (data: OrderForm) => {
    setIsSubmitting(true);
    console.log(data);
    setIsSubmitting(false);
  };

  return (
    <PageContainer title="Create Order" description="Create a new order">
      <OrderFormProvider>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <OrderSection />
            <CustomerOrderSection />
          </div>
          <div>
            <OrderItemsSection />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 max-w-2xl mx-auto p-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Create New Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input id="orderNumber" {...register('orderNumber')} />
                  {errors.orderNumber && (
                    <p className="text-sm text-red-500">
                      {errors.orderNumber.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={`w-full justify-start text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    {...register('totalAmount', { valueAsNumber: true })}
                  />
                  {errors.totalAmount && (
                    <p className="text-sm text-red-500">
                      {errors.totalAmount.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(OrderStatusEnum.Values).map(
                            (status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status && (
                    <p className="text-sm text-red-500">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeId">Store ID</Label>
                  <Input id="storeId" {...register('storeId')} />
                  {errors.storeId && (
                    <p className="text-sm text-red-500">
                      {errors.storeId.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer ID</Label>
                  <Input id="customerId" {...register('customerId')} />
                  {errors.customerId && (
                    <p className="text-sm text-red-500">
                      {errors.customerId.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Order'}
          </Button>
        </form>
      </OrderFormProvider>
    </PageContainer>
  );
}
