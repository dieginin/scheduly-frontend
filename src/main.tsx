import "@/index.css"

import { SchedulyApp } from "@/SchedulyApp"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SchedulyApp />
  </StrictMode>,
)
