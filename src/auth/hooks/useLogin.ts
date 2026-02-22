import { type LoginFormData, loginFormSchema } from "../validations/login.schema"

import type { Field } from "@/shared/interfaces/field.interface"
import { toast } from "sonner"
import { useAuth } from "./useAuth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const useLogin = () => {
  const fields: Field<LoginFormData>[] = [
    {
      label: "Identifier",
      name: "identifier",
      placeholder: "Enter your email or username",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      type: "password",
    },
  ]

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { identifier: "", password: "" },
  })

  const { login } = useAuth()
  const onSubmit = async (data: LoginFormData) => {
    const { password, identifier } = data
    const isLoginSuccessful = await login(identifier, password)

    if (isLoginSuccessful) toast.success("Welcome back")
  }
  return { fields, form, onSubmit }
}
