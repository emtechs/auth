import { z } from 'zod'
import {
  UserCreateSchemaBody,
  UserReturnSchemaBody,
  UserUpdateRequestSchemaBody,
} from '../schemas'

export interface IRequestUser {
  id: string
  is_super: boolean
}

export interface IUser {
  login: string
  name: string
  cpf: string
}

export type IUserReturn = z.infer<typeof UserReturnSchemaBody>

export type IUserRequest = z.infer<typeof UserCreateSchemaBody>

export type IUserUpdateRequest = z.infer<typeof UserUpdateRequestSchemaBody>
