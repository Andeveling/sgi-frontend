import { useAuthStore } from '@/store/auth/auth.store';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  const status = useAuthStore((state) => state.status);
  if (status === 'authorized') {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-muted/50">
        <span className="font-bold text-9xl">SGI</span>
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
}
