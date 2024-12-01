import { SidebarTrigger } from '@/components';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between h-16 shrink-0 border-b gap-2 px-3">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger className="text-primary" />
        <Separator orientation="vertical" className="h-4 mr-2" />
      </div>
      <ModeToggle />
    </header>
  );
}
