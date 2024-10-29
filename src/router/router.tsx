import { createBrowserRouter } from "react-router-dom"

import { Root } from "@/root"
import DashboardLayout from "@/layouts/DashboardLayout/dashboard-layout"
import HomeView from "@/modules/dashboard/views/home/home.view"
import AuthLayout from "@/layouts/AuthLayout/auth-layout"
import LoginView from "@/modules/auth/views/login.view"
import StoreView from "@/modules/dashboard/views/store/store.view"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Dashboard Routes
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <HomeView />,
          },
          {
            path: "store",
            element: <StoreView />,
          }
        ],
      },

      // Auth Routes
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginView />,
          },
        ],
      },
    ],
  },
])
