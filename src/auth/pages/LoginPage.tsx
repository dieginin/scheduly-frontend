import { AuthForm } from "../components/AuthForm"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router"

export const LoginPage = () => {
  const navigate = useNavigate()
  const { fields, form, onSubmit } = useLogin()

  return (
    <AuthForm
      description='Welcome please login'
      fields={fields}
      form={form}
      secondaryAction={{ label: "Register", onClick: () => navigate("/auth/register") }}
      submitLabel='Login'
      title='Scheduly'
      onSubmit={onSubmit}
      showLogo
    />
  )
}
