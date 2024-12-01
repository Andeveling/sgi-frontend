import { DataTable } from '@/components/data-table';
import PageContainer from '@/components/page-container/page-container';
import { CreateProductAction } from './components/create-product-action/create-product-action';
import { productsColumns } from './components/products-data-table/products-columns';
import { getProducts } from './services/product.service';
import { useQuery } from '@tanstack/react-query';
import { useTitleView } from '@/hooks/use-title-view';

export default function ProductsPage() {
  useTitleView({ layoutDisplayName: 'Dashboard', viewDisplayName: 'Products' });
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <PageContainer title="Products" description="Manage your products">
      <DataTable
        columns={productsColumns}
        data={products?.data as any}
        actions={<CreateProductAction />}
        searchColumn="name"
      />
    </PageContainer>
  );
}
