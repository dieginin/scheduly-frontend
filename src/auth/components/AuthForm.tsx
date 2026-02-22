import type { FieldValues, UseFormReturn } from "react-hook-form"

import { AuthCard } from "./AuthCard"
import { Button } from "@/shared/components/ui/button"
import type { Field } from "@/shared/interfaces/field.interface"
import { LoaderCircle } from "lucide-react"
import { MapFields } from "@/shared/components/common/MapFields"
import type { MouseEventHandler } from "react"

interface SecondaryAction {
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface Props<T extends FieldValues> {
  description: string
  fields: Field<T>[]
  form: UseFormReturn<T>
  secondaryAction?: SecondaryAction
  showLogo?: boolean
  submitLabel: string
  title: string
  onSubmit: (data: T) => Promise<void>
}

export const AuthForm = <T extends FieldValues>({
  description,
  fields,
  form,
  secondaryAction,
  showLogo = false,
  submitLabel,
  title,
  onSubmit,
}: Props<T>) => {
  return (
    <AuthCard title={title} description={description} showLogo={showLogo}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
        <div className='grid gap-3 px-3'>
          <MapFields fields={fields} form={form} />
        </div>

        <div className='grid gap-3'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className='animate-spin' /> Please wait...
              </>
            ) : (
              submitLabel
            )}
          </Button>
          {secondaryAction && (
            <Button type='button' variant='outline' disabled={form.formState.isSubmitting} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </form>
    </AuthCard>
  )
}
