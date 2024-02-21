import { prisma } from '../../lib'
import { IImageRequest } from '../../interfaces'
import { deleteImageService } from '../../services'

export const createImageService = async (data: IImageRequest) => {
  const { user_id } = data

  const image = await prisma.image.findUnique({
    where: { user_id },
  })

  if (image) await deleteImageService(image.id)

  return await prisma.image.create({
    data,
  })
}
