import type { ReportSlice, StatusSlice } from "../types"

import { ReportActions } from "@/app/actions/report.actions"
import type { StateCreator } from "zustand"
import { StatusActions } from "@/app/actions/status.actions"
import { normalizeReport } from "@/app/lib/store.utils"

export const createStatusSlice: StateCreator<StatusSlice & ReportSlice, [], [], StatusSlice> = (set, get) => ({
  status: "idle",

  isLunching: false,
  isWorking: false,
  tookLunch: false,

  clockIn: async () => {
    let report = get().report

    report = !report ? await ReportActions.create() : await StatusActions.clockIn(report)
    report = normalizeReport(report)
    const shift = report?.shifts.find(s => !s.endDate) ?? null

    set({ report, shift, status: "working", isWorking: true })
  },

  clockOut: async () => {
    const report = normalizeReport(await StatusActions.clockOut(get().report!, get().shift!))

    set({ report, shift: null, status: "idle", isLunching: false, isWorking: false, tookLunch: false })
  },

  startLunch: async () => {
    const report = normalizeReport(await StatusActions.startLunch(get().report!, get().shift!))
    const shift = report?.shifts.find(r => !r.endDate) ?? null

    set({ report, shift, status: "lunch", isLunching: true })
  },

  endLunch: async () => {
    const report = normalizeReport(await StatusActions.endLunch(get().report!, get().shift!))
    const shift = report?.shifts.find(r => !r.endDate) ?? null

    set({ report, shift, status: "working", isLunching: false, tookLunch: true })
  },
})
