import { prisma } from '../../lib'
import { IImageRequest } from '../../interfaces'

export const createImageService = async (data: IImageRequest) => {
  return await prisma.image.create({
    data,
  })
}
