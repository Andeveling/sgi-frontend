import { useAuthStore } from '@/store/auth/auth.store';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { useQuery } from '@tanstack/react-query';
import { getStores } from '@/pages/dashboard/pages/store/services/store.service';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';

export default function WelcomeLayout() {
 const checkProfileUser = useAuthStore((state) => state.checkProfileUser);
 const user = useAuthStore((state) => state.user);
 const status = useAuthStore((state) => state.status);
 const currentStore = useStoreSelected((state) => state.store);
 const setStore = useStoreSelected((state) => state.setStore);

 useEffect(() => {
   if (user?.isNew) {
     checkProfileUser();
   }
 }, [user?.isNew, checkProfileUser]);

 const {
   data: stores,
   isLoading,
   isError,
 } = useQuery({
   queryKey: ['stores'],
   queryFn: getStores,
 });

 if (isLoading) return <div>Loading...</div>;
 if (isError) return <div>Error al cargar tiendas</div>;
 if(stores) setStore(stores.data[0]);
  
 if (status !== 'authorized') {
   return <Navigate to="/auth/login" />;
 }

 if (!user?.isNew && currentStore) {
   return <Navigate to={`/dashboard/${currentStore.id}`} />;
 }

  return <Outlet />;
}
