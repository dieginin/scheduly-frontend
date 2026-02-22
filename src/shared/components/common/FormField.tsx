import type { ControllerFieldState, ControllerRenderProps, FieldValues } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"

import type { HTMLInputTypeAttribute } from "react"
import { Input } from "../ui/input"

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T>
  fieldState: ControllerFieldState
  label: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
}

export const FormField = <T extends FieldValues>({ field, fieldState, label, placeholder, type }: Props<T>) => {
  return (
    <Field data-invalid={fieldState.invalid} className='grid gap-1'>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder={placeholder} type={type} />

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}
