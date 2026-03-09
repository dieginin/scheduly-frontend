import { formatDate, formatTime } from "./date.utils"

import type { Duration } from "../interfaces/util.interface"
import type { Report } from "../interfaces/report.interface"
import type { Shift } from "../interfaces/shift.interface"

export const calculateDays = (report: Report | null): number => {
  if (!report) return 0

  const start = report.startDate.getTime()
  const end = (report.endDate ?? new Date()).getTime()

  const diffMs = Math.max(1, end - start)
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

const durationBetween = (start?: Date | string | null, end?: Date | string | null): Duration => {
  if (!start || !end) return { hours: 0, minutes: 0 }

  const startDate = start instanceof Date ? start : new Date(start)
  const endDate = end instanceof Date ? end : new Date(end)

  const diffMs = endDate.getTime() - startDate.getTime()
  const totalMinutes = Math.round(diffMs / (1000 * 60))

  return { hours: Math.round(totalMinutes / 60), minutes: totalMinutes % 60 }
}

export const shiftDuration = (shift: Shift | null) => durationBetween(shift?.startDate, shift?.endDate)

export const lunchDuration = (shift: Shift | null) => durationBetween(shift?.lunchStart, shift?.lunchEnd)

export const workDuration = (report: Report | null): Duration => {
  let totalMinutes = 0
  report?.shifts.forEach(shift => {
    const shiftDuration = durationBetween(shift.startDate, shift.endDate ?? new Date())
    const lunchDuration = durationBetween(shift.lunchStart, shift.lunchEnd)

    const shiftMinutes = shiftDuration.hours * 60 + shiftDuration.minutes
    const lunchMinutes = lunchDuration.hours * 60 + lunchDuration.minutes

    totalMinutes += Math.max(shiftMinutes - lunchMinutes, 0)
  })

  return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 }
}

export const buildReportClipboard = (report: Report, daysCount: number, workedTime: Duration) => {
  const shifts = [...report.shifts]
    .filter(shift => {
      const duration = shiftDuration(shift)
      return duration.hours > 0 || duration.minutes > 0
    })
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

  const shiftLines = shifts.map(shift => {
    const lunch = lunchDuration(shift)
    const duration = shiftDuration(shift)

    return [
      ` • ${formatDate(shift.startDate)} ${formatTime(shift.startDate)} - ${formatDate(shift.endDate)} ${formatTime(shift.endDate)}`,
      `  > worked for ${duration.hours > 0 ? `${duration.hours}hrs ` : ""}${duration.minutes > 0 ? duration.minutes + "mns " : ""}${lunch.hours || lunch.minutes ? `(lunch: ${lunch.hours}hrs ${lunch.minutes}mns)` : ""}`,
      "",
    ].join("\n")
  })

  return [
    `Report #${report.number}`,
    `${formatDate(report.startDate)} - ${formatDate(report.endDate)}`,
    `${daysCount} days - ${report.shifts.length} shifts`,
    `${workedTime.hours} hrs ${workedTime.minutes} mns`,
    "",
    "-----------------------------------------------",
    "Shifts:",
    ...shiftLines,
  ].join("\n")
}
