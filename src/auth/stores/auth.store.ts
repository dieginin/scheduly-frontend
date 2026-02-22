import { type StateCreator, create } from "zustand"

import type { AuthResponse } from "../interfaces/Auth.response"
import type { User } from "../interfaces/user.interface"
import { checkToken } from "../actions/check-token.action"
import { login } from "../actions/login.action"
import { register } from "../actions/register.action"
import { updatePassword } from "../actions/update-password.action"
import { updateUser } from "../actions/update-user.action"
import { useReportStore } from "@/app/stores/report/report.store"

type Status = "checking" | "authenticated" | "not-authenticated"

interface AuthState {
  status: Status
  token: string | null
  user: User | null

  checkToken: () => Promise<boolean>
  login: (identifier: string, password: string) => Promise<boolean>
  logout: () => boolean
  register: (email: string, fullName: string, password: string, username: string) => Promise<boolean>
  updatePassword: (password: string) => Promise<boolean>
  updateUser: (email: string, fullName: string, username: string) => Promise<boolean>
}

const storeApi: StateCreator<AuthState> = (set, get) => {
  const setUser = (response: AuthResponse) => {
    const { user, token } = response
    set({ user, token, status: "authenticated" })
    localStorage.setItem("token", token)
    return true
  }

  const removeUser = () => {
    useReportStore.getState().clear()
    localStorage.removeItem("report")
    localStorage.removeItem("token")
    set({ user: null, token: null, status: "not-authenticated" })
    return false
  }

  return {
    status: "checking",
    token: null,
    user: null,

    checkToken: async () => {
      const response = await checkToken()
      if (!response) return removeUser()
      return setUser(response)
    },
    login: async (identifier, password) => {
      const response = await login(identifier, password)
      if (!response) return removeUser()
      setUser(response)
      await useReportStore.getState().getReports()
      return true
    },
    logout: () => removeUser(),
    register: async (email, fullName, password, username) => {
      const response = await register(email, fullName, password, username)
      if (!response) return removeUser()
      return setUser(response)
    },
    updatePassword: async password => {
      const response = await updatePassword(password)
      if (!response) return false
      return setUser(response)
    },
    updateUser: async (email, name, username) => {
      const response = await updateUser(email, name, username)
      if (!response) return false
      return setUser({ user: response, token: get().token! })
    },
  }
}

export const useAuthStore = create<AuthState>()(storeApi)
