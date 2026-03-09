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
import { type SetStateAction, useState } from "react"

import { Download } from "lucide-react"
import { buildReportClipboard } from "@/app/lib/report.utils"
import { toast } from "sonner"
import { useReport } from "./useReport"

export const useExportReport = ({ setShowReport }: { setShowReport: (value: SetStateAction<boolean>) => void }) => {
  const [exportReportOpen, setExportReportOpen] = useState(false)
  const { report, daysCount, workedTime, submitReport } = useReport()

  const handleSubmitReport = async () => {
    const clipboardText = buildReportClipboard(report!, daysCount, workedTime)
    await navigator.clipboard
      .writeText(clipboardText)
      .then(() => toast.success(`Report #${report?.number} copied to clipboard successfully`))
      .catch(() => toast.error("Error while copying the report"))
    await submitReport()
    setShowReport(false)
  }

  const ExportReportDialog = () => (
    <AlertDialog open={exportReportOpen} onOpenChange={setExportReportOpen}>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-destructive/10 text-destructive'>
            <Download />
          </AlertDialogMedia>
          <AlertDialogTitle>Export report?</AlertDialogTitle>
          <AlertDialogDescription>
            This report will be submitted and moved to the report history
            <br />
            <small className='text-destructive font-bold'>This cannot be undone</small>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={handleSubmitReport}>
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { ExportReportDialog, setExportReportOpen }
}
