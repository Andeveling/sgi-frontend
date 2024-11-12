import { createBrowserRouter } from 'react-router-dom';

import WelcomeLayout from '@/layouts/welcome-layout/welcome-layout';
import NoFound404Page from '@/pages/404/nofound-404';
import WelcomePage from '@/pages/welcome/welcome-page';
import { Root } from '@/root';
import DashboardLayout from '@/layouts/DashboardLayout/dashboard-layout';
import HomePage from '@/pages/dashboard/pages/home/home.page';
import CategoriesPage from '@/pages/dashboard/pages/store/categories/categories-page';
import AuthLayout from '@/layouts/AuthLayout/auth-layout';
import LoginPage from '@/pages/auth/pages/login/login-page';
import ProductsPage from '@/pages/dashboard/pages/store/products/products-page';
import CreateProductPage from '@/pages/dashboard/pages/store/products/pages/create/create-product-page';
import EditProductPage from '@/pages/dashboard/pages/store/products/pages/edit/edit-product-page';
import CustomersPage from '@/pages/dashboard/pages/store/customers/customers-page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        id: 'dashboardLayout',
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
          {
            id: 'storeHomePage',
            path: ':storeId',
            Component: HomePage,
          },
          {
            id: 'categoryPage',
            path: ':storeId/categories',
            Component: CategoriesPage,
          },
          {
            id: 'productsPage',
            path: ':storeId/products',
            Component: ProductsPage,
          },
          {
            id: 'createProductPage',
            path: ':storeId/products/create',
            Component: CreateProductPage,
          },
          {
            id: 'editProductPage',
            path: ':storeId/products/:productId/edit',
            Component: EditProductPage,
          },
          {
            id: 'customersPage',
            path: ':storeId/customers',
            Component: CustomersPage,
          }
        ],
      },
    ],
  },
  {
    id: 'authLayout',
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        id: 'loginPage',
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    id: 'welcomeLayout',
    path: 'welcome',
    element: <WelcomeLayout />,
    children: [
      {
        id: 'welcomePage',
        path: '',
        element: <WelcomePage />,
      },
    ],
  },
  {
    id: 'noFound',
    path: '*',
    element: <NoFound404Page />,
  },
]);
