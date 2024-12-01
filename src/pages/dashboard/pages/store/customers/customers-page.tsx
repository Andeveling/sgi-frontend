import { DataTable } from '@/components/data-table';
import PageContainer from '@/components/page-container/page-container';
import { useQuery } from '@tanstack/react-query';
import { customersColumns } from './components/customers-data-table/customers-columns';
import { getCustomers } from './services/customers.service';
import CreateCustomerModal from './components/customers-data-table/create-customer-modal';

export default function CustomersPage() {
  const {
    data: customers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (customers) {
    return (
      <PageContainer title="Customers" description="Manage your customers">
        <DataTable
          columns={customersColumns}
          data={customers.data}
          actions={<CreateCustomerModal />}
          searchColumn="name"
        />
      </PageContainer>
    );
  }
  return null;
}
