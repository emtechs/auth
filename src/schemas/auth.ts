import { z } from 'zod'

export const SessionSchemaBody = z.object({
  login: z.string(),
  password: z.string(),
})

export const RecoveryPasswordSchemaBody = z.object({
  login: z.string(),
  base_url: z.string().url(),
})

export const PasswordUpdateSchemaBody = z.object({
  password: z.string(),
  id: z.string().uuid(),
  token: z.string(),
})

export const TokenSchemaParams = z.object({
  token: z.string(),
})
