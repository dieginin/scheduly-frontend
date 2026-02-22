import { Loading } from "../components/common/Loading"
import type { PropsWithChildren } from "react"
import { useAuth } from "@/auth/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { checkToken } = useAuth()

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkToken,
    retry: false,
    refetchInterval: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: true,
  })

  if (isLoading) return <Loading />
  return children
}
