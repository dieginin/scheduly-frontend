import { AuthForm } from "../components/AuthForm"
import { useNavigate } from "react-router"
import { useRegister } from "../hooks/useRegister"

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { fields, form, onSubmit } = useRegister()

  return (
    <AuthForm
      description='Please enter your information'
      fields={fields}
      form={form}
      secondaryAction={{ label: "Go Back", onClick: () => navigate("/auth/login") }}
      submitLabel='Register'
      title='Register'
      onSubmit={onSubmit}
    />
  )
}
