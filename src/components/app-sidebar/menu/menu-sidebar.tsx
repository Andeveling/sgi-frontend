import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Home, Package, Settings } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Store",
    url: "/dashboard/store",
    icon: Package,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export default function MenuSidebar() {
  const location = useLocation()
  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = location.pathname === item.url
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link to={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
