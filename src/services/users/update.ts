import { compareSync, hashSync } from 'bcryptjs'
import { AppError } from '../../errors'
import { IRequestUser, IUserUpdateRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { UserReturnSchemaBody } from '../../schemas'

export const updateUserService = async (
  id: string,
  {
    email,
    is_active,
    is_first_access,
    is_super,
    name,
    old_password,
    password,
  }: IUserUpdateRequest,
  reqUser: IRequestUser,
) => {
  if (old_password && password) {
    const user = await prisma.user.findUnique({ where: { id } })
    if (user) {
      const passwordMatch = compareSync(old_password, user.password)
      if (!passwordMatch) {
        throw new AppError('old password does not match')
      }
      password = hashSync(password, 10)
    }
  } else if (password) password = hashSync(password, 10)

  if (is_active !== undefined) {
    if (!reqUser.is_super) throw new AppError('Missing permissions', 401)
  }

  if (is_super !== undefined) {
    if (!reqUser.is_super) throw new AppError('Missing permissions', 401)
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        is_super,
        is_active,
        is_first_access,
      },
    })

    return UserReturnSchemaBody.parse(user)
  } catch {
    throw new AppError('user not found', 404)
  }
}
