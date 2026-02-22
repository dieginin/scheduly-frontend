import { useAuthStore } from "../stores/auth.store"

export const useAuth = () => {
  const status = useAuthStore(s => s.status)
  const token = useAuthStore(s => s.token)
  const user = useAuthStore(s => s.user)

  const checkToken = useAuthStore(s => s.checkToken)
  const login = useAuthStore(s => s.login)
  const logout = useAuthStore(s => s.logout)
  const register = useAuthStore(s => s.register)
  const updatedPassword = useAuthStore(s => s.updatePassword)
  const updatedUser = useAuthStore(s => s.updateUser)

  const getUserInitials = () => {
    if (!user) return ""
    const nameSegments = user.fullName.split(" ")
    const initials = nameSegments.map(name => name[0]).join("")
    return initials.toUpperCase()
  }

  const getUserShortName = () => {
    if (!user) return ""
    const nameSegments = user.fullName.split(" ")
    return `${nameSegments[0]}${nameSegments.length > 1 ? " " + nameSegments[1][0] + "." : ""}`
  }

  return {
    status,
    token,
    user,

    getUserInitials,
    getUserShortName,

    checkToken,
    login,
    logout,
    register,
    updatedPassword,
    updatedUser,
  }
}
