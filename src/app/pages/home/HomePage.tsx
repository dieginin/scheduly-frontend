import { Dashboard } from "./ui/Dashboard"
import { MenuButton } from "./ui/MenuButton"
import { Report } from "./ui/Report"
import { useReport } from "@/app/hooks/useReport"

export const HomePage = () => {
  const { showReport, setShowReport } = useReport()

  return (
    <div className='grid items-start my-17.5 gap-10 w-sm md:w-xl lg:w-4xl lg:grid-cols-2 xl:w-6xl 2xl:w-7xl'>
      <MenuButton />

      <Dashboard showReport={showReport} setShowReport={setShowReport} />
      <Report showReport={showReport} setShowReport={setShowReport} />
    </div>
  )
}
