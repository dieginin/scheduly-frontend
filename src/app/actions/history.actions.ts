import type { Report } from "../interfaces/report.interface"
import { schedulyApi } from "@/shared/apis/scheduly.api"

const getReports = async () => {
  const { data } = await schedulyApi.get<Report[]>("/reports")
  return data
}

const submitReport = async (report: Report) => {
  const { data } = await schedulyApi.patch<Report>(`/reports/${report.id}`)
  return data
}

export const HistoryActions = { getReports, submitReport }
