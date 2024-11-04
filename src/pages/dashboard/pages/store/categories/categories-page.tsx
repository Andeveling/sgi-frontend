import { DataTable } from '@/components/data-table';
import { Category } from '@/models/category.model';
import { categoriesColumns } from './components/categories-data-table/columns';
import { DataTablePagination } from '@/components/data-table/pagination-data-table';
import PageContainer from '@/components/page-container/page-container';

const data: Category[] = [
  {
    id: '2131',
    name: 'Boards',
    createdAt: new Date('2023-03-01T00:00:00.000Z'),
    updatedAt: new Date('2023-03-01T00:00:00.000Z'),
  },
  {
    id: '2132',
    name: 'Mouses',
    createdAt: new Date('2023-03-01T00:00:00.000Z'),
    updatedAt: new Date('2023-03-01T00:00:00.000Z'),
  },
  {
    id: '2132',
    name: 'Mouses',
    createdAt: new Date('2023-03-28T00:00:00.000Z'),
    updatedAt: new Date('2023-03-01T00:00:00.000Z'),
  },
  {
    id: '2132',
    name: 'Mouses',
    createdAt: new Date('2023-03-29T00:00:00.000Z'),
    updatedAt: new Date('2023-03-01T00:00:00.000Z'),
  },
];

export default function CategoriesPage() {
  return (
    <PageContainer title="Categories" description="Manage your categories">
      <DataTable columns={categoriesColumns} data={data} />
    </PageContainer>
  );
}
