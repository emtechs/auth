import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const retrieveNameUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  })

  if (!user) throw new AppError('user not found', 404)

  return user
}
