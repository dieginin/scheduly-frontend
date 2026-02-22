import type { Report } from "../interfaces/report.interface"
import type { Shift } from "../interfaces/shift.interface"

export const reviveDate = (value: Date | string | null | undefined) => {
  if (!value) return null
  return value instanceof Date ? value : new Date(value)
}

export const normalizeShift = (shift: Shift): Shift => ({
  ...shift,
  startDate: new Date(shift.startDate),
  endDate: reviveDate(shift.endDate),
  lunchStart: reviveDate(shift.lunchStart),
  lunchEnd: reviveDate(shift.lunchEnd),
})

export const normalizeReport = (report: Report | null): Report | null => {
  if (!report) return null

  return {
    ...report,
    startDate: new Date(report.startDate),
    endDate: reviveDate(report.endDate),
    shifts: report.shifts.map(normalizeShift),
  }
}

export const normalizeReports = (reports: Report[]) => reports.map(report => normalizeReport(report) as Report)
