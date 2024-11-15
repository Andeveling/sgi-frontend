import { DataTable } from '@/components/data-table';
import PageContainer from '@/components/page-container/page-container';
import { useQuery } from '@tanstack/react-query';
import { ordersColumns } from './components/orders-data-table/orders-columns';
import { getOrders } from './services/orders.service';

export default function OrdersPage() {
  const {
    data: orders,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!orders) {
    return <div>No data</div>;
  }

  return (
    <PageContainer title="Orders" description="Manage your invoices">
      <DataTable columns={ordersColumns} data={orders.data} />
    </PageContainer>
  );
}
