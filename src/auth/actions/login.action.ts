import type { AuthResponse } from "../interfaces/Auth.response"
import { AxiosError } from "axios"
import { schedulyApi } from "@/shared/apis/scheduly.api"
import { toast } from "sonner"

export const login = async (identifier: string, password: string) => {
  try {
    const { data } = await schedulyApi.post<AuthResponse>("/auth/login", { identifier, password })
    return data
  } catch (error) {
    toast.error(error instanceof AxiosError ? error.response?.data.message : "An error occurred during login")
  }
}
