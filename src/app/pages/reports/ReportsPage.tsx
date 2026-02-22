import { useReport } from "@/app/hooks/useReport"

export const ReportsPage = () => {
  const { reports } = useReport()
  return <pre>{JSON.stringify(reports, null, 2)}</pre>
}
