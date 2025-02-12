import { KanbanIcon } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useStoreSelected } from '@/store/store-selected/store-selected.store';
import { Link, useLocation } from 'react-router-dom';
import { useBoardsQuery } from '@/pages/dashboard/pages/store/boards/hooks/use-boards-query';

export default function MenuSidebarSupport() {
  const store = useStoreSelected((state) => state.store);
  const { data: boards } = useBoardsQuery();

  const location = useLocation();
  return (
    <>
      <SidebarMenu>
        {boards?.map((board) => {
          const isActive =
            location.pathname === `/dashboard/${store?.id}/board/${board.id}`;
          return (
            <SidebarMenuItem key={board.id}>
              <SidebarMenuButton
                tooltip={board.name}
                asChild
                isActive={isActive}
              >
                <Link to={`/dashboard/${store?.id}/board/${board.id}`}>
                  <KanbanIcon />
                  {board.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </>
  );
}
