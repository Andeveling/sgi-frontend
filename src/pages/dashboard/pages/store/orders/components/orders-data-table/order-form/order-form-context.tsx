import { Form } from '@/components/ui/form';
import { OrderForm, OrderStatusEnum } from '@/models/orders.model';
import { createContext, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

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
  const defaultValues: OrderForm = {
    orderNumber: '',
    date: new Date(),
    totalAmount: 0,
    status: OrderStatusEnum.Values.PENDING,
    storeId: '',
    customerId: '',
    ordersItems: [{ price: 0, quantity: 1, productId: '' }],
  };

  const orderForm = useForm<OrderForm>({
    defaultValues,
  });


  

  return (
    <OrderFormContext.Provider value={{ orderForm }}>
      <Form {...orderForm}>{children}</Form>
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
