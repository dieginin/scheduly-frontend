import { Calendar, Clock7, Coffee, Hamburger, ListCheck, type LucideProps, Toolbox } from "lucide-react"

import type { ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from "react"

import { cva } from "class-variance-authority"
import { useReport } from "@/app/hooks/useReport"
import { cn } from "@/shared/lib/utils"
import { formatTime } from "@/app/lib/date.utils"
import { Card, CardContent } from "@/shared/components/ui/card"

const summaryCardVariants = cva("grid gap-2 text-center", {
  variants: {
    tone: {
      default: "",
      primary: "",
    },
  },
  defaultVariants: {
    tone: "default",
  },
})

const summaryIconVariants = cva("w-5 h-5 mx-auto", {
  variants: {
    tone: {
      default: "text-muted-foreground",
      primary: "text-primary",
    },
  },
  defaultVariants: {
    tone: "default",
  },
})

interface SummaryCardProps {
  className?: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  title: string
  tone?: "default" | "primary"
  value: string
}

export const SummaryCard = ({ className, icon: Icon, title, tone = "default", value }: SummaryCardProps) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className={summaryCardVariants({ tone })}>
        <Icon className={summaryIconVariants({ tone })} />
        <div className='font-mono text-xl font-bold whitespace-nowrap text-foreground'>{value}</div>
        <div className='text-xs text-muted-foreground/70'>{title}</div>
      </CardContent>
    </Card>
  )
}

export const SummaryStrip = ({ children }: PropsWithChildren) => <div className='flex justify-center h-32.5 gap-4' children={children} />

export const Summary = () => {
  const {
    report,
    shift,

    daysCount,
    lunchTime,
    workedTime,

    isLunching,
    isWorking,
    tookLunch,
  } = useReport()

  const workSummary = [
    {
      icon: Clock7,
      title: "Shift start",
      value: formatTime(shift?.startDate),
      visible: true,
    },
    {
      icon: Coffee,
      title: "Lunch start",
      value: formatTime(shift?.lunchStart),
      visible: isLunching && !tookLunch,
    },
    {
      icon: Hamburger,
      title: "Lunch time",
      value: `${lunchTime.hours}h ${lunchTime.minutes}m`,
      visible: tookLunch,
    },
  ]

  const reportSummary = [
    {
      icon: Calendar,
      title: "Days",
      value: daysCount.toString(),
    },
    {
      icon: ListCheck,
      title: "Shifts",
      value: report?.shifts.length.toString() ?? "0",
    },
    {
      icon: Toolbox,
      title: "Worked",
      value: `${workedTime.hours}h ${workedTime.minutes}m`,
    },
  ]

  return (
    <>
      <SummaryStrip>
        {isWorking ? (
          <>
            {workSummary
              .filter(s => s.visible)
              .map(s => (
                <SummaryCard key={s.title} icon={s.icon} title={s.title} value={s.value} />
              ))}
          </>
        ) : (
          <Card className='grid items-center w-full'>
            <CardContent className='text-2xl font-thin tracking-widest text-center'>No active shift</CardContent>
          </Card>
        )}
      </SummaryStrip>

      <SummaryStrip>
        {reportSummary.map(s => (
          <SummaryCard key={s.title} icon={s.icon} title={s.title} value={s.value} tone='primary' />
        ))}
      </SummaryStrip>
    </>
  )
}
