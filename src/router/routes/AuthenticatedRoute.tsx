import { Navigate } from "react-router"
import type { PropsWithChildren } from "react"
import { useAuth } from "@/auth/hooks/useAuth"

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { status } = useAuth()

  if (status === "not-authenticated") return <Navigate to='/auth/login' replace />
  return children
}
