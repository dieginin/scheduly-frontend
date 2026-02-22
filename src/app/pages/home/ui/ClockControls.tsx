import { Coffee, Play, Square, UtensilsCrossed } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import type { ElementType } from "react"
import { cva } from "class-variance-authority"
import { useReport } from "@/app/hooks/useReport"

type ControlType = "startShift" | "endShift" | "startLunch" | "endLunch"
type Intent = "primary" | "destructive" | "idle"
type Variant = "default" | "outline"

const clockButtonVariants = cva("gap-2 px-8 py-6 text-lg", {
  variants: {
    variant: {
      default: "",
      outline: "border",
    },
    intent: {
      primary: "",
      destructive: "",
      idle: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      intent: "primary",
      class: "bg-primary hover:bg-primary/90",
    },
    {
      variant: "default",
      intent: "idle",
      class: "bg-idle hover:bg-idle/90",
    },
    {
      variant: "outline",
      intent: "destructive",
      class: "border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive",
    },
    {
      variant: "outline",
      intent: "idle",
      class: "border-idle text-idle hover:bg-idle/10 hover:text-idle",
    },
  ],
})

interface ControlConfig {
  icon: ElementType
  label: string
  variant: Variant
  intent: Intent
}

const controls: Record<ControlType, ControlConfig> = {
  startShift: {
    icon: Play,
    label: "Start working",
    variant: "default",
    intent: "primary",
  },
  endShift: {
    icon: Square,
    label: "Clock-out",
    variant: "outline",
    intent: "destructive",
  },
  startLunch: {
    icon: Coffee,
    label: "Start Lunch",
    variant: "default",
    intent: "idle",
  },
  endLunch: {
    icon: UtensilsCrossed,
    label: "Stop Lunch",
    variant: "outline",
    intent: "idle",
  },
}

const ClockControl = ({ type, onClick }: { type: ControlType; onClick: () => void }) => {
  const control = controls[type]

  return (
    <Button
      size='sm'
      variant={control.variant}
      className={clockButtonVariants({
        variant: control.variant,
        intent: control.intent,
      })}
      onClick={onClick}
    >
      <control.icon className='w-5 h-5' />
      {control.label}
    </Button>
  )
}

export const ClockControls = () => {
  const {
    status,
    shift,

    clockIn,
    clockOut,
    endLunch,
    startLunch,
  } = useReport()

  const byStatus: Record<typeof status, ControlType[]> = {
    idle: ["startShift"],
    working: ["startLunch", "endShift"],
    lunch: ["endLunch", "endShift"],
  }

  const handlers: Record<ControlType, () => void> = {
    startShift: clockIn,
    endShift: clockOut,
    startLunch: startLunch,
    endLunch: endLunch,
  }

  return (
    <div className='flex flex-wrap justify-center gap-3'>
      {byStatus[status]
        .filter(c => c !== "startLunch" || !shift?.lunchStart)
        .map(type => (
          <ClockControl key={type} type={type} onClick={handlers[type]} />
        ))}
    </div>
  )
}
