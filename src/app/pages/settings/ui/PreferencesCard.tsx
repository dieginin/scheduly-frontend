import { CustomCard } from "./CustomCard"
import { Settings2 } from "lucide-react"
import { ThemeSwitch } from "./ThemeSwitch"

export const PreferencesCard = () => {
  return (
    <CustomCard icon={Settings2} title='Preferences' className='md:col-span-2'>
      <div className='flex items-center justify-between text-muted-foreground'>
        <h1 className='text-sm font-medium'>Language</h1>
        <small>Coming soon</small>
      </div>

      <ThemeSwitch />

      <div className='flex items-center justify-between text-muted-foreground'>
        <h1 className='text-sm font-medium'>Time format</h1> {/* Switch 12h/24h */}
        <small>Coming soon</small>
      </div>
    </CustomCard>
  )
}
