import { z } from 'zod'
import {
  UserCreateSchemaBody,
  UserReturnSchemaBody,
  UserUpdateRequestSchemaBody,
} from '../schemas'
import { IQuery } from './global.interfaces'

export type IRole = 'ADMIN' | 'SERV' | 'DIRET' | 'SECRET'

export type IDash = 'COMMON' | 'SCHOOL' | 'ORGAN' | 'ADMIN'

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

export interface IUserQuery extends IQuery {
  role?: IRole
  isNot_director_school?: 'true' | 'false'
  allNotServ?: 'true' | 'false'
  director?: 'true' | 'false'
  name?: string
  is_server?: 'true' | 'false'
}
