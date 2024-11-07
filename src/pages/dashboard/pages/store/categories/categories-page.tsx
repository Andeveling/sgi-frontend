import { DataTable } from '@/components/data-table';
import PageContainer from '@/components/page-container/page-container';
import { useQuery } from '@tanstack/react-query';
import { categoriesColumns } from './components/categories-data-table/columns';
import { CategoryPopover } from './components/save-category/save-category-popover';
import { getCategories } from './services/category.service';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { useEffect } from 'react';

export default function CategoriesPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const selectedStore = useStoreSelected((state) => state.store);
  
  useEffect(() => {
    useStoreSelected.persist.rehydrate();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (data) {
    return (
      <PageContainer
        title={`${selectedStore.name} Categories`}
        description="Manage your categories"
      >
        <DataTable
          columns={categoriesColumns}
          data={data.data}
          actions={<CategoryPopover />}
        />
      </PageContainer>
    );
  }
}
