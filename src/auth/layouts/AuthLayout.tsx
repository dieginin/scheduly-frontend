import { Outlet } from "react-router"

export const AuthLayout = () => {
  return (
    <div className='flex items-center justify-center min-h-svh'>
      <Outlet />
    </div>
  )
}
