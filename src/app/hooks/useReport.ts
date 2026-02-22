import { calculateDays, lunchDuration, workDuration } from "../lib/report.utils"

import { useReportStore } from "@/app/stores/report/report.store"
import { useState } from "react"

export const useReport = () => {
  const [showReport, setShowReport] = useState(false)

  const report = useReportStore(s => s.report)
  const reports = useReportStore(s => s.reports)
  const shift = useReportStore(s => s.shift)
  const status = useReportStore(s => s.status)

  const daysCount = calculateDays(report)
  const lunchTime = lunchDuration(shift)
  const workedTime = workDuration(report)

  const isLunching = useReportStore(s => s.isLunching)
  const isWorking = useReportStore(s => s.isWorking)
  const tookLunch = useReportStore(s => s.tookLunch)

  const addShift = useReportStore(s => s.addShift)
  const updateShift = useReportStore(s => s.updateShift)
  const removeShift = useReportStore(s => s.removeShift)
  const clockIn = useReportStore(s => s.clockIn)
  const clockOut = useReportStore(s => s.clockOut)
  const startLunch = useReportStore(s => s.startLunch)
  const endLunch = useReportStore(s => s.endLunch)
  const submitReport = useReportStore(s => s.submitReport)

  return {
    report,
    reports,
    shift,
    showReport,
    status,

    daysCount,
    lunchTime,
    workedTime,

    isLunching,
    isWorking,
    tookLunch,

    addShift,
    updateShift,
    removeShift,
    clockIn,
    clockOut,
    endLunch,
    setShowReport,
    startLunch,
    submitReport,
  }
}
