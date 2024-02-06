import { prisma } from '../../lib'
import { AppError } from '../../errors'
import { deleteImageService } from '../images'

export const deleteUserService = async (login: string) => {
  try {
    const user = await prisma.user.delete({
      where: { login },
      select: { profile: { select: { id: true } } },
    })

    if (user.profile?.id) await deleteImageService(user.profile.id)
  } catch {
    throw new AppError('user not found', 404)
  }
}
