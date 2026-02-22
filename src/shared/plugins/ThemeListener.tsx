import { useEffect } from "react"
import { useThemeStore } from "../stores/theme.store"

const getSystemTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

export const ThemeListener = () => {
  const theme = useThemeStore(s => s.theme)

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = () => {
      root.classList.remove("light", "dark")

      root.classList.add(theme === "system" ? getSystemTheme() : theme)
    }

    applyTheme()

    const onChange = () => theme === "system" && applyTheme()

    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [theme])
  return null
}
