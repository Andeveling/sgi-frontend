import { AppSidebar } from "@/components"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Navigate, Outlet } from "react-router-dom"
import DashboardHeader from "./dashboard-header"
import { useAuth } from "@/hooks/useAuth"

export default function DashboardLayout() {
  const authorize = true
  const { user } = useAuth()
  console.log(user)
  if (!authorize) {
    return <Navigate to='/auth/login' />
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <Outlet />
            <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
