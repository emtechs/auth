import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const verifyUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      is_super: true,
    },
  })

  if (!user) throw new AppError('user not found', 404)

  return user
}
