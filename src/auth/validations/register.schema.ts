import { AlphanumericRegex, AlphanumericWithSpaceRegex, FULLNAME_MIN, PASSWORD_MIN, USERNAME_MIN, validationMessages } from "@/shared/lib/constants"

import { z } from "zod"

export type RegisterFormData = z.infer<typeof registerFormSchema>

export const registerFormSchema = z
  .object({
    confirmPassword: z.string().trim().min(PASSWORD_MIN, validationMessages.passwordMin),
    email: z.email(validationMessages.validEmail).trim(),
    fullName: z.string().trim().min(FULLNAME_MIN, validationMessages.nameMin).regex(AlphanumericWithSpaceRegex, validationMessages.alphanumeric),
    password: z.string().trim().min(PASSWORD_MIN, validationMessages.passwordMin),
    username: z.string().trim().min(USERNAME_MIN, validationMessages.usernameMin).regex(AlphanumericRegex, validationMessages.alphanumeric),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: validationMessages.passwordMatch,
    path: ["confirmPassword"],
  })
