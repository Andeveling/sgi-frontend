import { createBrowserRouter } from "react-router-dom"

import { Root } from "@/root"
import DashboardLayout from "@/layouts/DashboardLayout/dashboard-layout"
import Home from "@/modules/dashboard/views/home/home"
import AuthLayout from "@/layouts/AuthLayout/auth-layout"
import Login from "@/modules/auth/views/login"

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
            element: <Home />,
          },
        ],
      },
      // Auth Routes
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
])
