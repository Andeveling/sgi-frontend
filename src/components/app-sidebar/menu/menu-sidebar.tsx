import {
  BookMarked,
  Home,
  ShoppingBagIcon,
  ShoppingCartIcon,
  Users2Icon,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { Link, useLocation } from 'react-router-dom';

export default function MenuSidebar() {
  const store = useStoreSelected((state) => state.store);
  const data = {
    navMain: [
      {
        title: 'Home',
        url: `/dashboard/${store?.id}`,
        icon: Home,
        isActive: true,
      },

      {
        title: 'Categories',
        url: `/dashboard/${store?.id}/categories`,
        icon: ShoppingBagIcon,
        isActive: false,
      },
      {
        title: 'Products',
        url: `/dashboard/${store?.id}/products`,
        icon: ShoppingCartIcon,
        isActive: false,
      },
      {
        title: 'Customers',
        url: `/dashboard/${store?.id}/customers`,
        icon: Users2Icon,
        isActive: false,
      },
      {
        title: 'Orders',
        url: `/dashboard/${store?.id}/orders`,
        icon: BookMarked,
        isActive: false,
      },
    ],
  };

  const location = useLocation();
  return (
    <>
      <SidebarMenu>
        {data.navMain.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={isActive}
              >
                <Link to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </>
  );
}
