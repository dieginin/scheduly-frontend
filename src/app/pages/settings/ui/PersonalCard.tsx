import { CustomCard } from "./CustomCard"
import type { Field } from "@/shared/interfaces/field.interface"
import { personalFormSchema, type PersonalFormData } from "../validations/personal.schema"
import { User } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/auth/hooks/useAuth"
import { MapFields } from "@/shared/components/common/MapFields"

const fields: Field<PersonalFormData>[] = [
  {
    label: "Name",
    name: "fullName",
    placeholder: "Enter your name",
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
]

export const PersonalCard = () => {
  const { user, updatedUser } = useAuth()
  const form = useForm<PersonalFormData>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
      username: user?.username,
    },
  })

  const onSubmit = async (data: PersonalFormData) => {
    const { email, fullName, username } = data
    if (email === user?.email && fullName === user?.fullName && username === user?.username) return toast.warning("No changes detected")

    const isUpdateSuccess = await updatedUser(email, fullName, username)

    if (isUpdateSuccess) return toast.success("Personal information updated")
  }

  return (
    <CustomCard
      icon={User}
      title='Personal Information'
      description="Update your profile's information"
      disabled={form.formState.isSubmitting}
      buttonLabel='Save'
      onBtnClick={form.handleSubmit(onSubmit)}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5'>
        <MapFields fields={fields} form={form} />
      </form>
    </CustomCard>
  )
}
