import { Button } from "@/shared/components/ui/button"
import { Clock } from "./Clock"
import type { SetStateAction } from "react"
import { Summary } from "./Summary"
import { cn } from "@/shared/lib/utils"
import { useReport } from "@/app/hooks/useReport"

interface Props {
  showReport: boolean

  setShowReport: (value: SetStateAction<boolean>) => void
}

export const Dashboard = ({ showReport, setShowReport }: Props) => {
  const { report } = useReport()

  return (
    <div className='self-start lg:sticky lg:top-17.5'>
      <div className={cn("gap-4", showReport ? "hidden lg:grid" : "grid animate-fadeIn lg:animate-none")}>
        <Clock />
        <Summary />

        <Button size='sm' variant='link' disabled={!report} className='lg:hidden' onClick={() => setShowReport(true)}>
          {report ? "View report" : "No report available"}
        </Button>
      </div>
    </div>
  )
}
