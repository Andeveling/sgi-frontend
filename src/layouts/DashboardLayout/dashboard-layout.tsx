import { AppSidebar } from '@/components';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import DashboardHeader from './dashboard-header';
import { useAuthStore } from '@/store/auth/auth.store';
import { getStores } from '@/pages/dashboard/pages/store/services/store.service';
import { useQuery } from '@tanstack/react-query';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';

export default function DashboardLayout() {
  const status = useAuthStore((state) => state.status);
  const currentStore = useStoreSelected((state) => state.store);
  const setStore = useStoreSelected((state) => state.setStore);
  const setStores = useStoreSelected((state) => state.setStores);

  const { data:stores, error, isPending } = useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  if (stores) {
    setStore(stores.data[0]);
    setStores(stores.data);
  }

  if (status !== 'authorized') {
    return <Navigate to="/auth/login" />;
  }

  if (status === 'authorized' && !currentStore) {
    return <Navigate to="/welcome" />;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Outlet />
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
