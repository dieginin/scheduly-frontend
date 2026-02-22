import type { AuthResponse } from "../interfaces/Auth.response"
import { schedulyApi } from "@/shared/apis/scheduly.api"
import { toast } from "sonner"

export const checkToken = async () => {
  const token = localStorage.getItem("token")
  if (!token) return

  try {
    const { data } = await schedulyApi.get<AuthResponse>("/auth/check-token")
    return data
  } catch {
    toast.error("Session expired")
  }
}
