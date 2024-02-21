import { z } from 'zod'
import {
  PasswordUpdateSchemaBody,
  PasswordVerifySchemaBody,
  RecoveryPasswordSchemaBody,
  SessionSchemaBody,
} from '../schemas'

export type ISessionRequest = z.infer<typeof SessionSchemaBody>

export type IRecoveryPasswordRequest = z.infer<
  typeof RecoveryPasswordSchemaBody
>

export type IPasswordVerifyRequest = z.infer<typeof PasswordVerifySchemaBody>

export type IPasswordUpdateRequest = z.infer<typeof PasswordUpdateSchemaBody>
