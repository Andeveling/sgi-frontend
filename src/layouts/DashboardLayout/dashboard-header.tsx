import {
  SidebarTrigger,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between h-16 shrink-0 border-b gap-2 px-3">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4 mr-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ModeToggle />
    </header>
  );
}
