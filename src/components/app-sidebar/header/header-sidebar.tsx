import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getStores } from '@/pages/dashboard/pages/store/services/store.service';
import { useQuery } from '@tanstack/react-query';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';

export default function HeaderSidebar() {
  const selectedStore = useStoreSelected((state) => state.store);

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center border-2 border-primary rounded-lg bg-transparent text-primary shadow-md shadow-primary/50">
                  <GalleryVerticalEnd className="size-4" />
                </div>

                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Store</span>
                  <span>{selectedStore.name}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownContentAsync />
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

const DropdownContentAsync = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
  });

  const selectedStore = useStoreSelected((state) => state.store);
  const setSelectedStore = useStoreSelected((state) => state.setStore);
  const setStores = useStoreSelected((state) => state.setStores);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if (data) {
    setStores(data.data);
    setSelectedStore(data.data[0]);
  }
  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width]"
      align="start"
    >
      {data?.data.map((store) => (
        <DropdownMenuItem
          key={store.id}
          onSelect={() => setSelectedStore(store)}
        >
          {store.name}{' '}
          {store.name === selectedStore.name && <Check className="ml-auto" />}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};
