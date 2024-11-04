import {
    GalleryVerticalEnd
} from "lucide-react"

import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"

export default function HeaderSidebar() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size='lg' asChild className='overflow-hidden'>
            <a href='#'>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <GalleryVerticalEnd className='size-4' />
              </div>
              <div className='flex flex-col gap-0.5 leading-none'>
                <span className='font-semibold'>Inventory Menu</span>
                <span className=''>V1.0.0</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
