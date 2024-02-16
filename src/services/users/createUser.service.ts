import { hashSync } from 'bcryptjs'
import { prisma } from '../../lib'
import { IRequestUser, IUserRequest } from '../../interfaces'
import { AppError } from '../../errors'
import { UserReturnSchemaBody } from '../../schemas'
import { updateUserService } from './updateUser.service'

export const createUserService = async (
  { login, name, password, cpf, is_super }: IUserRequest,
  reqUser: IRequestUser,
) => {
  const userData = await prisma.user.findUnique({
    where: { login },
  })

  if (userData) return UserReturnSchemaBody.parse(userData)

  password = password || login.slice(0, 6)
  password = hashSync(password, 10)

  if (is_super !== undefined) {
    if (reqUser) {
      if (!reqUser.is_super) throw new AppError('Missing permissions', 401)

      const user = await prisma.user.create({
        data: {
          login,
          name,
          password,
          cpf,
        },
      })

      return await updateUserService(user.id, { is_super }, reqUser)
    }
  }

  const user = await prisma.user.create({
    data: {
      login,
      name,
      password,
      cpf,
    },
  })

  return UserReturnSchemaBody.parse(user)
}
