import { KanbanIcon } from 'lucide-react';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { Link, useLocation } from 'react-router-dom';


export default function MenuSidebarSupport() {
  const store = useStoreSelected((state) => state.store);
  const data = {
    navMain: [
      {
        title: 'Issues',
        url: `/dashboard/${store?.id}/issues`,
        icon: KanbanIcon,
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
