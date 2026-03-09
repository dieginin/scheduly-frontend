import { PASSWORD_MIN, validationMessages } from "@/shared/lib/constants"

import { z } from "zod"

export type SecurityFormData = z.infer<typeof securityFormSchema>

export const securityFormSchema = z
  .object({
    newPassword: z.string().trim().min(PASSWORD_MIN, validationMessages.passwordMin),
    confirmNewPassword: z.string().trim().min(PASSWORD_MIN, validationMessages.passwordMin),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    error: validationMessages.passwordMatch,
    path: ["confirmNewPassword"],
  })
