import type { FieldValues, Path } from "react-hook-form"

import type { HTMLInputTypeAttribute } from "react"

export interface Field<T extends FieldValues> {
  label: string
  name: Path<T>
  placeholder: string
  type?: HTMLInputTypeAttribute
}
