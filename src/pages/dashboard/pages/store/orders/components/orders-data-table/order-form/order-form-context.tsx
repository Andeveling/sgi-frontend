import { Form } from '@/components/ui/form';
import { OrderForm, OrderStatusEnum } from '@/models/orders.model';
import { createContext, useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '../../../services/orders.service';
import { toast } from 'sonner';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { DevTool } from '@hookform/devtools';
import { useOrdersStore } from '@/store/orders/orders.store';
import { orderItemAdapter } from '../../../adapters/order-item.adapter';

interface OrderFormContextType {
  orderForm: UseFormReturn<OrderForm>;
}

export const OrderFormContext = createContext<OrderFormContextType | null>(
  null,
);

export const OrderFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const selectedStore = useStoreSelected((state) => state.store);
  const orderItems = useOrdersStore((state) => state.orderItems);
  const defaultValues: OrderForm = {
    date: new Date(),
    status: OrderStatusEnum.Values.PENDING,
    storeId: selectedStore?.id || '',
    customerId: '',
    orderItems: [],
  };

  const orderForm = useForm<OrderForm>({
    defaultValues,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    orderForm.register('orderItems');
  }, []);

  useEffect(() => {
    orderForm.setValue(
      'orderItems',
      orderItems.map((item) => orderItemAdapter(item)),
    );
  }, [orderItems]);

  const onSubmit: SubmitHandler<OrderForm> = (data) => {
    mutate(data);
  };

  const onError: SubmitErrorHandler<OrderForm> = (error) => {
    console.log(error);
  };

  return (
    <OrderFormContext.Provider value={{ orderForm }}>
      <Form {...orderForm}>
        <form onSubmit={orderForm.handleSubmit(onSubmit, onError)}>
          {children}
          <Button type="submit" className='mt-4'>Create Order</Button>
        </form>
        <DevTool control={orderForm.control} />
      </Form>
    </OrderFormContext.Provider>
  );
};

export const useOrderForm = () => {
  const orderFormContext = useContext(OrderFormContext);
  if (!orderFormContext) {
    throw new Error('useOrderForm must be used within a OrderFormProvider');
  }
  return orderFormContext.orderForm;
};
