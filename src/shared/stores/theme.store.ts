import { create, type StateCreator } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "dark" | "light" | "system"

interface ThemeState {
  theme: Theme

  setTheme: (theme: Theme) => void
}

const storeApi: StateCreator<ThemeState> = set => ({
  theme: "system",

  setTheme: (theme: Theme) => set({ theme }),
})

export const useThemeStore = create<ThemeState>()(persist(storeApi, { name: "theme" }))
