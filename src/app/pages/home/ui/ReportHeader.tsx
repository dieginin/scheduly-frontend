import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { ChevronLeft, Download } from "lucide-react"
import { type SetStateAction, useState } from "react"

import { Button } from "@/shared/components/ui/button"
import { buildReportClipboard } from "@/app/lib/report.utils"
import { formatDate } from "@/app/lib/date.utils"
import { toast } from "sonner"
import { useAddShift } from "@/app/hooks/useAddShift"
import { useReport } from "@/app/hooks/useReport"

export const ReportHeader = ({ setShowReport }: { setShowReport: (value: SetStateAction<boolean>) => void }) => {
  const [exporting, setExporting] = useState(false)
  const { report, status, daysCount, workedTime, submitReport } = useReport()
  const { AddDialog, setAddOpen } = useAddShift({ report: report! })

  const handleSubmitReport = async () => {
    setExporting(true)
    await submitReport()
    await navigator.clipboard
      .writeText(buildReportClipboard(report!, daysCount, workedTime))
      .then(() => {
        toast.success(`Report #${report?.number} copied to clipboard successfully`)
      })
      .catch(() => toast.error("Error while copying the report"))
    setExporting(false)
    setShowReport(false)
  }

  return (
    <Card>
      <AddDialog />
      <CardHeader className='items-center'>
        <CardTitle className='text-3xl'>Report #{report?.number}</CardTitle>
        <CardDescription className='font-thin'>
          <small className='font-extrabold text-primary lg:hidden'>First:</small> {formatDate(report?.startDate)}
          <small className='hidden font-extrabold text-primary lg:inline'> || </small>
          <br className='block font-extrabold text-primary lg:hidden' />
          <small className='font-extrabold text-primary lg:hidden'>Last:</small> {formatDate(report?.endDate)}
        </CardDescription>
        <CardAction className='grid gap-2'>
          <Button size='sm' variant='link' className='lg:hidden' onClick={() => setShowReport(false)} disabled={exporting}>
            <ChevronLeft className='-mr-1' />
            Back to dashboard
          </Button>
          <Button size='sm' variant='outline' onClick={() => setAddOpen(true)} disabled={status !== "idle"}>
            Add past shift
          </Button>
          <Button size='sm' variant='ghost' onClick={handleSubmitReport} disabled={status !== "idle" || exporting}>
            <Download />
            {/* TODO confirm dialog & dropdown export pdf or text */}
            Export
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className='text-center'>
        {daysCount} days, {report?.shifts.length} shifts · {workedTime.hours} hours {workedTime.minutes} mins
      </CardContent>
    </Card>
  )
}
