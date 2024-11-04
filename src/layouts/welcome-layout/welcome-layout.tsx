import { useAuthStore } from '@/store/auth/auth.store';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export default function WelcomeLayout() {
  const checkProfileUser = useAuthStore((state) => state.checkProfileUser);
  const user = useAuthStore((state) => state.user);

  // Usamos useEffect para llamar a checkProfileUser una sola vez
  useEffect(() => {
    if (user?.isNew) {
      checkProfileUser();
    }
  }, []); // Solo ejecuta si `user` cambia

  if (!user?.isNew) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
