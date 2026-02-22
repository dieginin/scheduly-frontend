import type { Field } from "@/shared/interfaces/field.interface"
import { Controller, type FieldValues, type UseFormReturn } from "react-hook-form"
import { FormField } from "./FormField"

interface Props<T extends FieldValues> {
  fields: Field<T>[]
  form: UseFormReturn<T>
}

export const MapFields = <T extends FieldValues>({ fields, form }: Props<T>) => {
  return fields.map(f => (
    <Controller
      key={f.name}
      name={f.name}
      control={form.control}
      render={({ field, fieldState }) => (
        <FormField field={field} fieldState={fieldState} label={f.label} placeholder={f.placeholder} type={f.type} />
      )}
    />
  ))
}
