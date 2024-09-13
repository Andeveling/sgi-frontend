import { createBrowserRouter } from "react-router-dom"

import AuthLayout from "@/layouts/AuthLayout"
import DashboardLayout from "@/layouts/DashboardLayout"
import LoginPage from "@/pages/auth/LoginPage/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage/RegisterPage"
import { Dashboard } from "../pages/index"
import { Root } from "../Root"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      /// Dashboard Routes
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
        ],
      },

      /// Auth Routes
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
])
