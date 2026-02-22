import { normalizeReport, normalizeReports, normalizeShift } from "@/app/lib/store.utils"

import type { ReportStore } from "./types"
import { create } from "zustand"
import { createHistorySlice } from "./slices/history.slice"
import { createReportSlice } from "./slices/report.slice"
import { createStatusSlice } from "./slices/status.slice"
import { persist } from "zustand/middleware"

export const useReportStore = create<ReportStore>()(
  persist((...a) => ({ ...createReportSlice(...a), ...createStatusSlice(...a), ...createHistorySlice(...a) }), {
    name: "report",
    onRehydrateStorage: () => state => {
      if (!state) return
      state.report = normalizeReport(state.report)
      state.reports = normalizeReports(state.reports)
      state.shift = state.shift ? normalizeShift(state.shift) : null
    },
  }),
)
