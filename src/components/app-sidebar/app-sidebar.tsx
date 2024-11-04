import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar"
import FooterSidebar from "./footer/footer-sidebar"
import HeaderSidebar from "./header/header-sidebar"
import MenuSidebar from "./menu/menu-sidebar"

export function AppSidebar() {
  return (
    <>
      <Sidebar collapsible='offcanvas'>
        <HeaderSidebar />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <MenuSidebar />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <FooterSidebar />
      </Sidebar>
    </>
  )
}
