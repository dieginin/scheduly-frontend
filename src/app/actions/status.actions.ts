import type { Report } from "../interfaces/report.interface"
import type { Shift } from "../interfaces/shift.interface"
import { schedulyApi } from "@/shared/apis/scheduly.api"

const clockIn = async (report: Report) => {
  const { data } = await schedulyApi.post<Report>(`/reports/${report.id}/shifts`, { startDate: new Date() })
  return data
}

const clockOut = async (report: Report, shift: Shift) => {
  const currentDate = new Date()
  const lunchEnd = shift.lunchStart && !shift.lunchEnd ? currentDate : undefined
  const { data } = await schedulyApi.patch<Report>(`/reports/${report.id}/shifts/${shift.id}`, { endDate: currentDate, lunchEnd })
  return data
}

const startLunch = async (report: Report, shift: Shift) => {
  const { data } = await schedulyApi.patch<Report>(`/reports/${report.id}/shifts/${shift.id}`, { lunchStart: new Date() })
  return data
}

const endLunch = async (report: Report, shift: Shift) => {
  const { data } = await schedulyApi.patch<Report>(`/reports/${report.id}/shifts/${shift.id}`, { lunchEnd: new Date() })
  return data
}

export const StatusActions = { clockIn, clockOut, startLunch, endLunch }
