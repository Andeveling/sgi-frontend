import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { useEffect } from 'react';

export default function HeaderSidebar() {
  const selectedStore = useStoreSelected((state) => state.store);
  const setSelectedStore = useStoreSelected((state) => state.setStore);
  const stores = useStoreSelected((state) => state.stores);

  useEffect(() => {
    useStoreSelected.persist.rehydrate();
  }, []);

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
            <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width]"
      align="start"
    >
      {stores.map((store) => (
        <DropdownMenuItem
          key={store.id}
          onSelect={() => setSelectedStore(store)}
        >
          {store.name}{' '}
          {store.name === selectedStore.name && <Check className="ml-auto" />}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
            
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
