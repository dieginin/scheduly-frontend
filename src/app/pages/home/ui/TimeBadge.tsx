import type { Duration } from "@/app/interfaces/util.interface"
import type { ForwardRefExoticComponent } from "react"
import type { LucideProps } from "lucide-react"
import { cn } from "@/shared/lib/utils"

interface Props {
  color?: string
  icon: ForwardRefExoticComponent<LucideProps>
  time: Duration
}

export const TimeBadge = ({ color = "foreground", icon: Icon, time }: Props) => {
  return (
    <div className={cn("inline-flex items-center gap-1.5 py-1 text-sm font-medium", `text-${color}`)}>
      <Icon className='w-4 h-4' />
      <span>
        {time.hours}h {time.minutes}m
      </span>
    </div>
  )
}
