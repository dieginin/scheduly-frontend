import { Card, CardContent } from "@/shared/components/ui/card"

import { CurrentShift } from "./CurrentShift"
import { FinishedShifts } from "./FinishedShifts"
import { ReportHeader } from "./ReportHeader"
import type { SetStateAction } from "react"
import { cn } from "@/shared/lib/utils"
import { useReport } from "@/app/hooks/useReport"

interface Props {
  showReport: boolean

  setShowReport: (value: SetStateAction<boolean>) => void
}

export const Report = ({ showReport, setShowReport }: Props) => {
  const { report } = useReport()

  return (
    <div className={cn(showReport ? "flex animate-fadeIn lg:animate-none" : "hidden lg:flex")}>
      {report ? (
        <div className='flex flex-col w-full gap-4'>
          <ReportHeader setShowReport={setShowReport} />
          <CurrentShift />
          <FinishedShifts />
        </div>
      ) : (
        <Card className='w-full'>
          <CardContent className='text-2xl font-thin tracking-widest text-center'>No report available</CardContent>
        </Card>
      )}
    </div>
  )
}
