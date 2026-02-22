import { type RegisterFormData, registerFormSchema } from "../validations/register.schema"

import type { Field } from "@/shared/interfaces/field.interface"
import { toast } from "sonner"
import { useAuth } from "./useAuth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const useRegister = () => {
  const fields: Field<RegisterFormData>[] = [
    {
      label: "Full Name",
      name: "fullName",
      placeholder: "Enter your full name",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      type: "email",
    },
    {
      label: "Username",
      name: "username",
      placeholder: "Enter your username",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      type: "password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      placeholder: "Confirm your password",
      type: "password",
    },
  ]

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { confirmPassword: "", email: "", fullName: "", password: "", username: "" },
  })

  const { register } = useAuth()
  const onSubmit = async (data: RegisterFormData) => {
    const { email, fullName, password, username } = data
    const isRegistrationSuccessful = await register(email, fullName, password, username)

    if (isRegistrationSuccessful) toast.success("Welcome")
  }
  return { fields, form, onSubmit }
}
