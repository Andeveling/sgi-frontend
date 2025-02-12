import { DataTable } from '@/components/data-table';
import { movementsColumns } from './movements-columns';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { useMovementsQuery } from '../hooks/inventory-queries';

export function MovementsTable() {
    const store = useStoreSelected((state) => state.store);
    const {data: movements} = useMovementsQuery(store.id);

    return (
      <DataTable
        columns={movementsColumns}
        data={movements}
        actions={<button>Actions</button>}
        searchColumn="type"
      />
    );
}
