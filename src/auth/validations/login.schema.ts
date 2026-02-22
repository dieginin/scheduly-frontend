import { AlphanumericRegex, PASSWORD_MIN, USERNAME_MIN, validationMessages } from "@/shared/lib/constants"

import { z } from "zod"

export type LoginFormData = z.infer<typeof loginFormSchema>

export const loginFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (z.email().safeParse(value).success) return

      if (value.length < USERNAME_MIN) ctx.addIssue({ code: "custom", message: validationMessages.usernameMin })
      if (!AlphanumericRegex.test(value)) ctx.addIssue({ code: "custom", message: validationMessages.alphanumeric })
    }),
  password: z.string().trim().min(PASSWORD_MIN, validationMessages.passwordMin),
})
