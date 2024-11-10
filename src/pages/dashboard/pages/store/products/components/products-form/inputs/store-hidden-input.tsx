import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

export default function StoreHiddenInput() {
  const form = useFormContext();
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
