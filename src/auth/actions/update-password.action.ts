import type { AuthResponse } from "../interfaces/Auth.response"
import { AxiosError } from "axios"
import { schedulyApi } from "@/shared/apis/scheduly.api"
import { toast } from "sonner"
import { useAuthStore } from "../stores/auth.store"

export const updatePassword = async (password: string) => {
  const user = useAuthStore.getState().user!

  try {
    const { data } = await schedulyApi.patch<AuthResponse>(`/auth/${user.id}`, { password })
    return data
  } catch (error) {
    toast.error(error instanceof AxiosError ? error.response?.data.message : "An error occurred during update")
  }
}
