import { Outlet, Navigate } from "react-router-dom"

export default function AuthLayout() {
  const autorice = true

  if (!autorice) {
    return <Navigate to='/auth/login' />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
