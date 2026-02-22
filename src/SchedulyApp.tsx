import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AuthProvider } from "./shared/plugins/AuthProvider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router"
import { ThemeListener } from "./shared/plugins/ThemeListener"
import { Toaster } from "sonner"
import { appRouter } from "./router/app.router"
import { useThemeStore } from "./shared/stores/theme.store"

const queryClient = new QueryClient()

export const SchedulyApp = () => {
  const theme = useThemeStore(s => s.theme)

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>

      <ThemeListener />
      <Toaster position='top-right' theme={theme} closeButton />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
