import { Card, CardContent, CardDescription, CardTitle } from "@/shared/components/ui/card"
import { Coffee, Toolbox } from "lucide-react"
import { formatDate, formatTime } from "@/app/lib/date.utils"
import { lunchDuration, shiftDuration } from "@/app/lib/report.utils"

import type { SetStateAction } from "react"
import { ShiftActions } from "./ShiftActions"
import { TimeBadge } from "./TimeBadge"
import { useReport } from "@/app/hooks/useReport"

export const FinishedShifts = ({ setShowReport }: { setShowReport: (value: SetStateAction<boolean>) => void }) => {
  const { report } = useReport()
  const shifts = report?.shifts.filter(s => !!s.endDate) ?? []

  if (!shifts.length)
    return (
      <Card className='text-xl font-thin tracking-widest text-center'>
        <CardTitle>No shifts recorded</CardTitle>
        <CardContent>Start or continue your shift</CardContent>
      </Card>
    )

  return shifts
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .map((shift, index) => (
      <Card key={`${index}-${shift.startDate.getTime()}`} className='relative text-xl font-thin tracking-widest text-center gap-2'>
        <ShiftActions shift={shift} setShowReport={setShowReport} />

        <CardTitle>Shift {index + 1}</CardTitle>
        <CardDescription>
          {formatDate(shift.startDate)} <small className='font-extrabold text-primary'>||</small> {formatDate(shift.endDate)}
          <p>
            {formatTime(shift.startDate)} <small className='font-extrabold text-primary'>||</small> {formatTime(shift.endDate)}
          </p>
        </CardDescription>
        <CardContent className='mx-auto'>
          <div className='flex gap-4'>
            <TimeBadge icon={Coffee} time={lunchDuration(shift)} color='idle' />
            <TimeBadge icon={Toolbox} time={shiftDuration(shift)} color='primary' />
          </div>
        </CardContent>
      </Card>
    ))
}
