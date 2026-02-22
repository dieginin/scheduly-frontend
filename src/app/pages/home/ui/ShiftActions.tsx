import { Edit, Trash } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import type { Shift } from "@/app/interfaces/shift.interface"
import { useDeleteShift } from "@/app/hooks/useDeleteShift"
import { useEditShift } from "@/app/hooks/useEditShift"
import { useReport } from "@/app/hooks/useReport"

export const ShiftActions = ({ shift }: { shift: Shift }) => {
  const { report } = useReport()
  const { DeleteConfirmationDialog, setDeleteConfirmationOpen } = useDeleteShift({ report: report!, shift })
  const { EditDialog, setEditOpen } = useEditShift({ report: report!, shift })

  return (
    <div className='absolute right-4 top-4'>
      <DeleteConfirmationDialog />
      <EditDialog />

      <Button className='text-idle hover:text-idle/75' size='icon' variant='ghost' onClick={() => setEditOpen(true)}>
        <Edit />
      </Button>
      <Button className='text-destructive hover:text-destructive/75' size='icon' variant='ghost' onClick={() => setDeleteConfirmationOpen(true)}>
        <Trash />
      </Button>
    </div>
  )
}
