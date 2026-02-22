import { z } from "zod"

export type ShiftData = z.infer<typeof shiftSchema>

export const shiftSchema = z
  .object({
    startDate: z.date(),
    lunchStart: z.date().optional().nullable(),
    lunchEnd: z.date().optional().nullable(),
    endDate: z.date(),
  })
  .superRefine((data, ctx) => {
    const { startDate, lunchStart, lunchEnd, endDate } = data

    const hasLunchStart = !!lunchStart
    const hasLunchEnd = !!lunchEnd

    /* ===============================
       1. Ambos o ninguno
    =============================== */
    if (hasLunchStart !== hasLunchEnd) {
      ctx.addIssue({
        code: "custom",
        path: ["lunchStart"],
        message: "Lunch start and end must be filled together",
      })

      ctx.addIssue({
        code: "custom",
        path: ["lunchEnd"],
        message: "Lunch start and end must be filled together",
      })
    }

    /* ===============================
       2. End >= Start
    =============================== */
    if (endDate < startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End time cannot be before start time",
      })
    }

    /* ===============================
       3. Lunch order
    =============================== */
    if (lunchStart && lunchEnd) {
      if (lunchStart >= lunchEnd) {
        ctx.addIssue({
          code: "custom",
          path: ["lunchEnd"],
          message: "Lunch end must be after lunch start",
        })
      }

      /* ===============================
         4. Lunch inside shift
      =============================== */
      if (lunchStart < startDate || lunchEnd > endDate) {
        ctx.addIssue({
          code: "custom",
          path: ["lunchStart"],
          message: "Lunch must be inside the shift time",
        })
      }
    }
  })
