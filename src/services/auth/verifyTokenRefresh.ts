/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { AppError } from '../../errors'
import { env } from '../../env'

export const verifyTokenRefreshService = (token: string) => {
  let id = ''

  jwt.verify(token, env.SECRET_KEY, (error, decoded: any) => {
    if (error) throw new AppError(error.message, 401)

    id = decoded.sub
  })

  return id
}
