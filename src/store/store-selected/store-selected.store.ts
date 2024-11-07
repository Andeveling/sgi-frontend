import { Store } from '@/models/store.model';
import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreSelectedState {
  stores: Store[];
  store: Store;
  setStore: (store: Store) => void;
  setStores: (stores: Store[]) => void;
}
const emptyStore: Store = {
  id: '',
  name: '',
  description: '',
  address: '',
  cellphone: '',
  createdAt: '',
  updatedAt: '',
};
const storeApi: StateCreator<any> = (set) => ({
  store: emptyStore,
  stores: [],
  setStore: (store: Store) => {
    set({ store });
  },
  setStores: (stores: Store[]) => {
    set({ stores });
  },
});

export const useStoreSelected = create<StoreSelectedState>()(
  devtools(
    persist(storeApi, {
      name: 'store-selected',
      skipHydration: true,
    }),
  ),
);
