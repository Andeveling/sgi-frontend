import { useAuthStore } from '@/store/auth/auth.store';
import { Separator } from '@/components/ui/separator';
import { BarChart, Package, Users } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  if (status === 'authorized' && user?.isNew) {
    return <Navigate to="/welcome" />;
  }

  if (status === 'authorized') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-background to-primary text-primary-foreground p-8 flex-col justify-center items-center text-center">
        <div className="space-y-6">
          <span className="font-bold text-6xl md:text-8xl">SGI</span>
          <p className="text-xl md:text-2xl font-semibold">
            Inventory Manage Systems
          </p>
          <div className="flex justify-center space-x-4">
            <Package size={48} />
            <Separator orientation="vertical" color="text-muted-foreground" />
            <BarChart size={48} />
            <Separator orientation="vertical" />
            <Users size={48} />
          </div>
          <p className="text-lg md:text-xl max-w-md mx-auto">
            Optimize your inventory, improve your processes and make informed
            decisions with our integrated system.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24">
        <div className="w-full max-w-md space-y-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
