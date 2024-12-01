import RootLayout from '@/layouts/RootLayout/root-layout';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


export const Root = () => {
  const { pathname } = useLocation();
  if (pathname === '/') {
    return <Navigate to={`/dashboard`} />;
  }

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};
