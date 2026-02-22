import type { Report } from "../interfaces/report.interface"
import type { Shift } from "../interfaces/shift.interface"
import type { ShiftData } from "../validations/shift.schema"
import { schedulyApi } from "@/shared/apis/scheduly.api"

const addShift = async (report: Report, shift: ShiftData) => {
  const payload = {
    ...shift,
    lunchStart: shift.lunchStart ?? undefined,
    lunchEnd: shift.lunchEnd ?? undefined,
    endDate: shift.endDate ?? undefined,
  }
  const { data } = await schedulyApi.post<Report>(`/reports/${report.id}/shifts`, payload)
  return data
}

const updateShift = async (report: Report, shift: Shift) => {
  const { data } = await schedulyApi.patch<Report>(`/reports/${report.id}/shifts/${shift.id}`, shift)
  return data
}

const removeShift = async (report: Report, shift: Shift) => {
  const { data } = await schedulyApi.delete<Report>(`/reports/${report.id}/shifts/${shift.id}`)
  return data
}

const create = async () => {
  const { data } = await schedulyApi.post<Report>("/reports", { startDate: new Date() })
  return data
}

export const ReportActions = { addShift, updateShift, removeShift, create }
