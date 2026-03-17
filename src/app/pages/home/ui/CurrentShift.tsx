import { Card, CardContent, CardTitle } from "@/shared/components/ui/card"
import { Coffee, Toolbox } from "lucide-react"
import { lunchDuration, shiftDuration } from "@/app/lib/report.utils"

import { StatusBadge } from "./StatusBadge"
import { TimeBadge } from "./TimeBadge"
import { useReport } from "@/app/hooks/useReport"

export const CurrentShift = () => {
  const { shift, status } = useReport()

  return (
    <Card className='text-xl font-thin tracking-widest text-center lg:hidden'>
      <CardTitle>Current shift</CardTitle>
      <CardContent className='flex justify-around'>
        <StatusBadge status={status} />
        <div className='flex gap-4 text-sm'>
          <TimeBadge icon={Coffee} time={lunchDuration(shift)} color='idle' />
          <TimeBadge icon={Toolbox} time={shiftDuration(shift)} color='primary' />
        </div>
      </CardContent>
    </Card>
  )
}
