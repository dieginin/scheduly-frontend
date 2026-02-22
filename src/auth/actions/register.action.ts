import type { AuthResponse } from "../interfaces/Auth.response"
import { AxiosError } from "axios"
import { schedulyApi } from "@/shared/apis/scheduly.api"
import { toast } from "sonner"

export const register = async (email: string, fullName: string, password: string, username: string) => {
  try {
    const { data } = await schedulyApi.post<AuthResponse>("/auth/register", { email, fullName, password, username })
    return data
  } catch (error) {
    toast.error(error instanceof AxiosError ? error.response?.data.message : "An error occurred during register")
  }
}
