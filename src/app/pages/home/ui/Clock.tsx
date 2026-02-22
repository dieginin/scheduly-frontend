import { Card, CardContent, CardTitle } from "@/shared/components/ui/card"
import { formatLongDate, formatTime } from "@/app/lib/date.utils"
import { useEffect, useState } from "react"

import { ClockControls } from "./ClockControls"
import { StatusBadge } from "./StatusBadge"
import { useReport } from "@/app/hooks/useReport"

const ClockTime = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='text-center'>
      <div className='text-6xl font-light tracking-tight text-transparent bg-linear-120 from-primary to-primary/35 bg-clip-text'>
        {formatTime(time)}
      </div>
      <p className='mt-2 text-muted-foreground'>{formatLongDate(time)}</p>
    </div>
  )
}

export const Clock = () => {
  const { status } = useReport()

  return (
    <Card className='mb-3 min-w-sm'>
      <CardTitle className='grid justify-center'>
        <StatusBadge status={status} />
      </CardTitle>

      <CardContent>
        <ClockTime />
      </CardContent>

      <ClockControls />
    </Card>
  )
}
