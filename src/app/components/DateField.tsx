import { ChevronDownIcon, Eraser } from "lucide-react"
import type { ControllerFieldState, ControllerRenderProps, FieldValues } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"

import { Button } from "@/shared/components/ui/button"
import { Calendar } from "@/shared/components/ui/calendar"
import { Input } from "@/shared/components/ui/input"
import { format } from "date-fns"
import { formatDate } from "../lib/date.utils"
import { useState } from "react"

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T>
  fieldState: ControllerFieldState
  label: string
  variant?: "date" | "time" | "dateTime"
}

export const DateField = <T extends FieldValues>({ field, fieldState, label, variant = "dateTime" }: Props<T>) => {
  const [open, setOpen] = useState(false)

  return (
    <FieldGroup data-invalid={fieldState.invalid} className='flex-row items-center mx-auto'>
      <Field id={field.name} data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name} className='w-11 text-xs'>
          {label}
        </FieldLabel>

        <div className='flex pl-2 items-center gap-2'>
          {(variant === "date" || variant === "dateTime") && (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant='outline' className='w-70 shrink justify-between text-sm'>
                  {field.value ? formatDate(field.value) : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  defaultMonth={field.value}
                  onSelect={date => {
                    if (!date) return

                    const newDate = new Date(date)
                    if (field.value) {
                      const oldDate = new Date(field.value)
                      newDate.setHours(oldDate.getHours(), oldDate.getMinutes(), oldDate.getSeconds())
                    }

                    setOpen(false)
                    field.onChange(newDate)
                  }}
                />
              </PopoverContent>
            </Popover>
          )}

          {(variant === "time" || variant === "dateTime") && (
            <Input
              type='time'
              step='1'
              value={field.value ? format(field.value, "HH:mm:ss") : ""}
              className='w-30 shrink-0 bg-background text-sm appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
              onChange={e => {
                if (!e.target.value) {
                  field.onChange(null)
                  return
                }

                const [hours, minutes, seconds] = e.target.value.split(":").map(Number)

                if (field.value) {
                  const newDate = new Date(field.value)
                  newDate.setHours(hours, minutes, seconds)
                  field.onChange(newDate)
                }
              }}
            />
          )}

          {field.name.includes("lunch") && <Eraser onClick={() => field.onChange(null)} />}
        </div>

        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    </FieldGroup>
  )
}
