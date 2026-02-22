import { AxiosError } from "axios"
import type { User } from "../interfaces/user.interface"
import { schedulyApi } from "@/shared/apis/scheduly.api"
import { toast } from "sonner"
import { useAuthStore } from "../stores/auth.store"

export const updateUser = async (email: string, fullName: string, username: string) => {
  const user = useAuthStore.getState().user!

  try {
    const { data } = await schedulyApi.patch<User>(`/auth/${user.id}`, {
      email: user.email !== email ? email : undefined,
      fullName: user.fullName !== fullName ? fullName : undefined,
      username: user.username !== username ? username : undefined,
    })
    return data
  } catch (error) {
    toast.error(error instanceof AxiosError ? error.response?.data.message : "An error occurred during update")
    console.log(error)
  }
}
