import { Navigate, Outlet, useLocation } from "react-router-dom"
import RootLayout from "@/layouts/RootLayout/root-layout"

export const Root = () => {
  const { pathname } = useLocation()

  if (pathname === "/") {
    return <Navigate to='/dashboard' />
  }

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}
