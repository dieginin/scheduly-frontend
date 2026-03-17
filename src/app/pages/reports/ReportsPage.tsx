import { Card, CardContent, CardTitle } from "@/shared/components/ui/card"
import { Coffee, Download, Toolbox } from "lucide-react"
import { calculateDays, copyReportToClipboard, eatDuration, workDuration } from "@/app/lib/report.utils"

import { BackButton } from "@/app/components/BackButton"
import { Button } from "@/shared/components/ui/button"
import { TimeBadge } from "../home/ui/TimeBadge"
import { useReport } from "@/app/hooks/useReport"

export const ReportsPage = () => {
  const { reports } = useReport()

  return (
    <div className='py-5.5'>
      <BackButton />

      <div className='grid gap-5 w-sm md:w-2xl'>
        {reports.map(report => (
          <Card key={`${report.id}-${report.startDate.getTime()}`} className='relative text-xl font-thin tracking-widest text-center gap-2'>
            <div className='absolute right-4'>
              <Button
                className='text-idle hover:text-idle/75'
                size='sm'
                variant='ghost'
                onClick={() => copyReportToClipboard(report, calculateDays(report), workDuration(report))}
              >
                <Download />
                Export
              </Button>
            </div>

            <CardTitle>Report #{report.number}</CardTitle>
            <CardContent className='flex justify-around'>
              <div className='flex gap-4 text-sm'>
                <TimeBadge icon={Coffee} time={eatDuration(report)} color='idle' />
                <TimeBadge icon={Toolbox} time={workDuration(report)} color='primary' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
