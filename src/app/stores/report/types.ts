import type { Report } from "@/app/interfaces/report.interface"
import type { Shift } from "@/app/interfaces/shift.interface"
import type { ShiftData } from "@/app/validations/shift.schema"
import type { Status } from "@/app/interfaces/util.interface"

export interface HistorySlice {
  reports: Report[]

  getReports: () => Promise<void>
  submitReport: () => Promise<void>
}

export interface ReportSlice {
  report: Report | null
  shift: Shift | null

  addShift: (report: Report, shift: ShiftData) => Promise<void>
  updateShift: (report: Report, shift: Shift) => Promise<void>
  removeShift: (report: Report, shift: Shift) => Promise<void>
  clear: () => void
}

export interface StatusSlice {
  status: Status

  isLunching: boolean
  isWorking: boolean
  tookLunch: boolean

  clockIn: () => Promise<void>
  clockOut: () => Promise<void>
  startLunch: () => Promise<void>
  endLunch: () => Promise<void>
}

export type ReportStore = HistorySlice & ReportSlice & StatusSlice
