import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const retrieveUserService = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ id }, { login: id }] },
    select: { id: true, name: true },
  })

  if (!user) throw new AppError('user not found', 404)

  return user
}
