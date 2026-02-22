import type { ReportSlice, ReportStore } from "../types"

import { ReportActions } from "@/app/actions/report.actions"
import type { StateCreator } from "zustand"
import { normalizeReport } from "@/app/lib/store.utils"

export const createReportSlice: StateCreator<ReportStore, [], [], ReportSlice> = set => ({
  report: null,
  shift: null,

  addShift: async (report, shift) => {
    report = await ReportActions.addShift(report, shift)
    set({ report: normalizeReport(report) })
  },

  updateShift: async (report, shift) => {
    report = await ReportActions.updateShift(report, shift)
    set({ report: normalizeReport(report) })
  },

  removeShift: async (report, shift) => {
    report = await ReportActions.removeShift(report, shift)
    set({ report: normalizeReport(report) })
  },

  clear: () => set({ report: null, reports: [], shift: null, status: "idle", isLunching: false, isWorking: false, tookLunch: false }),
})
