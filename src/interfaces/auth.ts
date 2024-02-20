import { z } from 'zod'
import {
  PasswordUpdateSchemaBody,
  RecoveryPasswordSchemaBody,
  SessionSchemaBody,
} from '../schemas'
import { IQuery } from './global.interfaces'

export type ISessionRequest = z.infer<typeof SessionSchemaBody>

export type IRecoveryPasswordRequest = z.infer<
  typeof RecoveryPasswordSchemaBody
>

export type IPasswordUpdateRequest = z.infer<typeof PasswordUpdateSchemaBody>

export interface IAuthQuery extends IQuery {
  year?: string
}
