import { AppSidebar } from "@/components"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Navigate, Outlet } from "react-router-dom"

export default function DashboardLayout() {
  const authorize = true

  if (!authorize) {
    return <Navigate to='/auth/login' />
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='flex items-center h-16 shrink-0 border-b gap-2'>
            <div className='flex items-center gap-2 px-3'>
              <SidebarTrigger />
              <Separator orientation='vertical' className='h-4 mr-2' />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>Building Your Application</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            <Outlet />
            <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
