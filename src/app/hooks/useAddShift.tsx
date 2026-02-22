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

import { DateField } from "../components/DateField"
import type { Report } from "../interfaces/report.interface"
import { useReport } from "./useReport"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { shiftSchema, type ShiftData } from "../validations/shift.schema"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props {
  report: Report
}

export const useAddShift = ({ report }: Props) => {
  const [addOpen, setAddOpen] = useState(false)
  const { addShift } = useReport()

  const getDefaults = (): ShiftData => {
    const startDate = new Date()
    const endDate = new Date(startDate)
    endDate.setHours(endDate.getHours() + 1)

    return {
      startDate,
      endDate,
      lunchStart: null,
      lunchEnd: null,
    }
  }

  const form = useForm<ShiftData>({
    resolver: zodResolver(shiftSchema),
    defaultValues: getDefaults(),
  })

  const handleAdd = async (newShift: ShiftData) => {
    await addShift(report, newShift)
    setAddOpen(false)
  }

  const AddDialog = () => (
    <AlertDialog
      open={addOpen}
      onOpenChange={open => {
        form.reset(getDefaults())
        setAddOpen(open)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add shift</AlertDialogTitle>
          <AlertDialogDescription>Enter the new shift information</AlertDialogDescription>
        </AlertDialogHeader>

        <form className='grid gap-5' onSubmit={form.handleSubmit(handleAdd)}>
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
          <AlertDialogAction variant='idle' onClick={form.handleSubmit(handleAdd)}>
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { AddDialog, setAddOpen }
}
