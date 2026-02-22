import { type SecurityFormData, securityFormSchema } from "../validations/security.schema"

import { CustomCard } from "./CustomCard"
import type { Field } from "@/shared/interfaces/field.interface"
import { Lock } from "lucide-react"
import { MapFields } from "@/shared/components/common/MapFields"
import { toast } from "sonner"
import { useAuth } from "@/auth/hooks/useAuth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const fields: Field<SecurityFormData>[] = [
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

export const SecurityCard = () => {
  const { updatedPassword } = useAuth()
  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: SecurityFormData) => {
    const { password } = data

    const isUpdateSuccess = await updatedPassword(password)

    if (isUpdateSuccess) return toast.success("Password updated")
  }

  return (
    <CustomCard
      icon={Lock}
      title='Security'
      description='Handle your password'
      disabled={form.formState.isSubmitting}
      buttonLabel='Update password'
      onBtnClick={form.handleSubmit(onSubmit)}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5'>
        <MapFields fields={fields} form={form} />
      </form>
    </CustomCard>
  )
}
