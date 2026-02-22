import { BackButton } from "@/app/components/BackButton"
import { PersonalCard } from "./ui/PersonalCard"
import { PreferencesCard } from "./ui/PreferencesCard"
import { SecurityCard } from "./ui/SecurityCard"
import { Settings } from "lucide-react"
import { Title } from "@/app/components/Title"

export const SettingsPage = () => {
  return (
    <div className='py-5.5'>
      <BackButton />

      <div className='grid gap-5 w-sm md:w-2xl'>
        <Title title='Settings' icon={Settings} />

        <div className='grid gap-4 px-2 md:grid-cols-2'>
          <PersonalCard />

          <SecurityCard />

          <PreferencesCard />
        </div>
      </div>
    </div>
  )
}
