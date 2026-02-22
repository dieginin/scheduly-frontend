import type { Shift } from "./shift.interface"

export interface Report {
  id: string
  number: number
  startDate: Date
  endDate: Date | null
  shifts: Shift[]
}
