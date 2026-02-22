import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog"
import { Controller, useForm } from "react-hook-form"
import { type ShiftData, shiftSchema } from "../validations/shift.schema"
import { useEffect, useMemo, useState } from "react"

import { DateField } from "../components/DateField"
import type { Report } from "../interfaces/report.interface"
import type { Shift } from "../interfaces/shift.interface"
import { useReport } from "./useReport"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props {
  report: Report
  shift: Shift
}

export const useEditShift = ({ report, shift }: Props) => {
  const [editOpen, setEditOpen] = useState(false)
  const { updateShift } = useReport()

  const defaults = useMemo(
    () => ({
      startDate: shift.startDate,
      lunchStart: shift.lunchStart ?? undefined,
      lunchEnd: shift.lunchEnd ?? undefined,
      endDate: shift.endDate ?? undefined,
    }),
    [shift],
  )

  const form = useForm<ShiftData>({
    resolver: zodResolver(shiftSchema),
    defaultValues: defaults,
  })

  useEffect(() => form.reset(defaults), [form, defaults])

  const handleEdit = async (newShift: ShiftData) => {
    await updateShift(report, { ...shift, ...newShift })
    setEditOpen(false)
  }

  const EditDialog = () => (
    <AlertDialog
      open={editOpen}
      onOpenChange={open => {
        if (!open) form.reset(defaults)
        setEditOpen(open)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit shift</AlertDialogTitle>
          <AlertDialogDescription>Enter the new shift information</AlertDialogDescription>
        </AlertDialogHeader>

        <form className='grid gap-5' onSubmit={form.handleSubmit(handleEdit)}>
          <Controller
            name='startDate'
            control={form.control}
            render={({ field, fieldState }) => <DateField field={field} fieldState={fieldState} label='Start Date' />}
          />
          <Controller
            name='lunchStart'
            control={form.control}
            render={({ field, fieldState }) => <DateField field={field} fieldState={fieldState} label='Lunch Start' />}
          />
          <Controller
            name='lunchEnd'
            control={form.control}
            render={({ field, fieldState }) => <DateField field={field} fieldState={fieldState} label='Lunch End' />}
          />
          <Controller
            name='endDate'
            control={form.control}
            render={({ field, fieldState }) => <DateField field={field} fieldState={fieldState} label='Finish Date' />}
          />
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='idle' onClick={form.handleSubmit(handleEdit)}>
            Edit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { EditDialog, setEditOpen }
}
