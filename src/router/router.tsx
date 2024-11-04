import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '@/layouts/AuthLayout/auth-layout';
import DashboardLayout from '@/layouts/DashboardLayout/dashboard-layout';
import NoFound404Page from '@/pages/404/nofound-404';
import LoginPage from '@/pages/auth/pages/login/login-page';
import HomePage from '@/pages/dashboard/pages/home/home.page';
import StorePage from '@/pages/dashboard/pages/store/store-page';
import { Root } from '@/root';
import WelcomePage from '@/pages/welcome/welcome-page';
import WelcomeLayout from '@/layouts/welcome-layout/welcome-layout';
import CategoriesPage from '@/pages/dashboard/pages/store/categories/categories-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      // Dashboard Routes
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: 'store',
            element: <StorePage />,
          },
          { path: 'categories', element: <CategoriesPage /> },
        ],
      },

      // Auth Routes
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'welcome',
    element: <WelcomeLayout />,
    children: [
      {
        path: '',
        element: <WelcomePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NoFound404Page />,
  },
]);
