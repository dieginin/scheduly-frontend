import { Navigate } from "react-router"
import type { PropsWithChildren } from "react"
import { useAuth } from "@/auth/hooks/useAuth"

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { status } = useAuth()

  if (status === "authenticated") return <Navigate to='/' replace />
  return children
}
