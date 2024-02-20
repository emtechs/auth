import { z } from 'zod'

export const SessionSchemaBody = z.object({
  login: z.string(),
  password: z.string(),
})

export const RecoveryPasswordSchemaBody = z.object({
  login: z.string(),
  base_url: z.string().url(),
})

export const PasswordUpdateSchemaBody = z.object({ password: z.string() })

export const PasswordUpdateSchemaParams = z.object({
  userId: z.string().uuid(),
  token: z.string(),
})

export const TokenSchemaParams = z.object({
  token: z.string(),
})
