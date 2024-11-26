import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar"
import FooterSidebar from "./footer/footer-sidebar"
import HeaderSidebar from "./header/header-sidebar"
import MenuSidebar from "./menu/menu-sidebar"
import MenuSidebarSupport from "./menu/menu-sidebar-support"

export function AppSidebar() {
  return (
    <>
      <Sidebar collapsible='offcanvas' title="SGI-sidebar">
        <HeaderSidebar />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Store Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <MenuSidebar />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <MenuSidebarSupport />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <FooterSidebar />
      </Sidebar>
    </>
  )
}
