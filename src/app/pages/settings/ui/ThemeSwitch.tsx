import { Monitor, Moon, Sun } from "lucide-react"
import { type Theme, useThemeStore } from "@/shared/stores/theme.store"
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group"

import { PreferenceOption } from "./PreferenceOption"

const themeOptions = [
  {
    value: "system",
    icon: Monitor,
    // icon: SunMoon,
  },
  {
    value: "light",
    icon: Sun,
  },
  {
    value: "dark",
    icon: Moon,
  },
]

export const ThemeSwitch = () => {
  const theme = useThemeStore(s => s.theme)
  const setTheme = useThemeStore(s => s.setTheme)

  return (
    <PreferenceOption title='Theme'>
      <ToggleGroup type='single' size='sm' defaultValue={theme}>
        {themeOptions.map(opt => (
          <ToggleGroupItem key={opt.value} value={opt.value} onClick={() => setTheme(opt.value as Theme)}>
            <opt.icon className='w-4 h-4' />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </PreferenceOption>
  )
}
