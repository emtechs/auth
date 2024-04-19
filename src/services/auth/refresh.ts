import jwt from 'jsonwebtoken'
import { env } from '../../env'
import { IRequestUser } from '../../interfaces'

export const refreshSessionService = ({ id, is_super }: IRequestUser) => {
  const token = jwt.sign({ is_super }, env.SECRET_KEY, {
    subject: id,
    expiresIn: '7d',
  })

  const refresh_token = jwt.sign({ is_super }, env.SECRET_KEY, {
    subject: id,
    expiresIn: '15d',
  })

  return { token, refresh_token }
}
