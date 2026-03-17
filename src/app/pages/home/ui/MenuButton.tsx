import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { History, LogOut, Settings } from "lucide-react"

import { useAuth } from "@/auth/hooks/useAuth"
import { useNavigate } from "react-router"

const routes = [
  {
    icon: History,
    label: "Reports",
    path: "/reports",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
]

export const MenuButton = () => {
  const { user, logout, getUserInitials, getUserShortName } = useAuth()
  const navigate = useNavigate()

  return (
    <div className='border-background fixed top-4 right-4 overflow-hidden rounded-sm border p-0.5 backdrop-blur-sm'>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center cursor-pointer'>
          <Avatar>
            <AvatarFallback className='text-xs'>{getUserInitials()}</AvatarFallback>
          </Avatar>
          <p className='m-2 text-sm'>{getUserShortName()}</p>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuLabel className='flex items-center gap-2'>
            <div className='grid'>
              <h1 className='text-xs'>{user?.fullName}</h1>
              <small className='font-light capitalize'>{user?.roles.join("")}</small>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {routes.map(route => (
            <DropdownMenuItem key={route.label} onClick={() => navigate(route.path)}>
              <route.icon />
              {route.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />

          <DropdownMenuItem variant='destructive' onClick={logout}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
