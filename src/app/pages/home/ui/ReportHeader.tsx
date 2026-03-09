import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { ChevronLeft, Download } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import type { SetStateAction } from "react"
import { formatDate } from "@/app/lib/date.utils"
import { useAddShift } from "@/app/hooks/useAddShift"
import { useExportReport } from "@/app/hooks/useExportReport"
import { useReport } from "@/app/hooks/useReport"

export const ReportHeader = ({ setShowReport }: { setShowReport: (value: SetStateAction<boolean>) => void }) => {
  const { report, status, daysCount, workedTime } = useReport()
  const { AddDialog, setAddOpen } = useAddShift({ report: report! })
  const { ExportReportDialog, setExportReportOpen } = useExportReport({ setShowReport })

  return (
    <Card>
      <AddDialog />
      <ExportReportDialog />
      <CardHeader className='items-center'>
        <CardTitle className='text-3xl'>Report #{report?.number}</CardTitle>
        <CardDescription className='font-thin'>
          <small className='font-extrabold text-primary lg:hidden'>First:</small> {formatDate(report?.startDate)}
          <small className='hidden font-extrabold text-primary lg:inline'> || </small>
          <br className='block font-extrabold text-primary lg:hidden' />
          <small className='font-extrabold text-primary lg:hidden'>Last:</small> {formatDate(report?.endDate)}
        </CardDescription>
        <CardAction className='grid gap-2'>
          <Button size='sm' variant='link' className='lg:hidden' onClick={() => setShowReport(false)}>
            <ChevronLeft className='-mr-1' />
            Back to dashboard
          </Button>
          <Button size='sm' variant='outline' onClick={() => setAddOpen(true)}>
            Add past shift
          </Button>
          <Button size='sm' variant='ghost' onClick={() => setExportReportOpen(true)} disabled={status !== "idle"}>
            <Download />
            {/* TODO dropdown export pdf or text */}
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
