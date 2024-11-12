import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { useProductFormContext } from '../../../context/product-form-context';

export default function StoreHiddenInput() {
  const { form } = useProductFormContext();
  const store = useStoreSelected(useShallow((state) => state.store));

  useEffect(() => {
    form.register('storeId');
    form.setValue('storeId', store?.id);
  }, [store]);

  return (
    <>
      <input type='hidden' value={store?.id} {...form.register('storeId')} />
    </>
  );
}
