import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const retrieveUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      is_super: true,
      is_first_access: true,
      profile: { select: { url: true } },
    },
  })

  if (!user) throw new AppError('user not found', 404)

  return user
}
