import { PASSWORD_MIN, validationMessages } from "@/shared/lib/constants"

import { z } from "zod"

export type SecurityFormData = z.infer<typeof securityFormSchema>

export const securityFormSchema = z
  .object({
    password: z.string().trim().min(PASSWORD_MIN, validationMessages.passwordMin),
    confirmPassword: z.string().trim().min(PASSWORD_MIN, validationMessages.passwordMin),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: validationMessages.passwordMatch,
    path: ["confirmPassword"],
  })
