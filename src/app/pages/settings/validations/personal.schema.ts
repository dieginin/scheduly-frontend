import { AlphanumericRegex, AlphanumericWithSpaceRegex, FULLNAME_MIN, USERNAME_MIN, validationMessages } from "@/shared/lib/constants"

import { z } from "zod"

export type PersonalFormData = z.infer<typeof personalFormSchema>

export const personalFormSchema = z.object({
  fullName: z.string().trim().min(FULLNAME_MIN, validationMessages.nameMin).regex(AlphanumericWithSpaceRegex, validationMessages.alphanumeric),
  email: z.email(validationMessages.validEmail).trim(),
  username: z.string().trim().min(USERNAME_MIN, validationMessages.usernameMin).regex(AlphanumericRegex, validationMessages.alphanumeric),
})
