import { Outlet } from "react-router"

export const AppLayout = () => {
  return (
    <div className='flex items-center justify-center min-h-svh'>
      <Outlet />
    </div>
  )
}
