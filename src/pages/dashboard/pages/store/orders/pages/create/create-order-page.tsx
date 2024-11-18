import PageContainer from '@/components/page-container/page-container';
import { OrderFormProvider } from '../../components/orders-data-table/order-form/order-form-context';
import { CustomerOrderSection } from '../../components/orders-data-table/order-form/sections-order-form/customer-order-section';
import { OrderItemsTableSection } from '../../components/orders-data-table/order-form/sections-order-form/order-items-section/order-items-table-section';
import { OrderSection } from '../../components/orders-data-table/order-form/sections-order-form/order-section';

export default function CreateOrderPage() {
  return (
    <PageContainer title="Create Order" description="Create a new order">
      <OrderFormProvider>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <OrderSection />
            <CustomerOrderSection />
          </div>
          <div>
            <OrderItemsTableSection />
          </div>
        </div>
      </OrderFormProvider>
    </PageContainer>
  );
}
