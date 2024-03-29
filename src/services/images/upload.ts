import { AppError } from '../../errors'
import { env } from '../../env'
import { createImageService } from '../../services'

export const uploadImageService = async (
  user_id: string,
  file?: Express.Multer.File,
) => {
  if (!file) throw new AppError('image not found')

  const { originalname: name, path, size, filename: key } = file

  const data = {
    name,
    size,
    url: path,
    key,
    user_id,
  }

  if (env.NODE_ENV === 'production') return await createImageService(data)

  const url = `http://localhost:${env.PORT}/files/${key}`
  data.url = url

  return await createImageService(data)
}
