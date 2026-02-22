import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog"

import type { Report } from "../interfaces/report.interface"
import type { Shift } from "../interfaces/shift.interface"
import { Trash } from "lucide-react"
import { useReport } from "./useReport"
import { useState } from "react"

interface Props {
  report: Report
  shift: Shift
}

export const useDeleteShift = ({ report, shift }: Props) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const { removeShift } = useReport()

  const DeleteConfirmationDialog = () => (
    <AlertDialog open={deleteConfirmationOpen} onOpenChange={setDeleteConfirmationOpen}>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-destructive/10 text-destructive'>
            <Trash />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete shift?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this shift
            <br />
            <small className='text-destructive font-bold'>This cannot be undone</small>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={async () => await removeShift(report, shift)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { DeleteConfirmationDialog, setDeleteConfirmationOpen }
}
