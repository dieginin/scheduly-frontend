import type { HistorySlice, ReportStore } from "../types"
import { normalizeReport, normalizeReports } from "@/app/lib/store.utils"

import { HistoryActions } from "@/app/actions/history.actions"
import type { StateCreator } from "zustand"

export const createHistorySlice: StateCreator<ReportStore, [], [], HistorySlice> = (set, get) => ({
  reports: [],

  getReports: async () => {
    let reports = normalizeReports(await HistoryActions.getReports())

    const report = normalizeReport(reports.find(report => !report.endDate) ?? null)
    const shift = report?.shifts.find(shift => !shift.endDate) ?? null

    if (report && shift) report.shifts = report?.shifts.filter(r => r.id !== shift.id)
    reports = report ? reports.filter(r => r.number !== report.number) : reports

    set({ report, reports, shift })
  },
  submitReport: async () => {
    let report = get().report!

    report = normalizeReport(await HistoryActions.submitReport(report))!
    const reports = [...get().reports, report]

    get().clear()
    set({ reports })
  },
})
