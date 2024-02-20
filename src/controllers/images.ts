import { Request, Response } from 'express'
import {
  createImageService,
  deleteImageService,
  uploadImageService,
} from '../services'

export const createImageController = async (req: Request, res: Response) => {
  const image = await createImageService(req.body)
  return res.status(201).json(image)
}

export const uploadImageController = async (req: Request, res: Response) => {
  const image = await uploadImageService(req.user.id, req.file)
  return res.status(201).json(image)
}

export const deleteImageController = async (req: Request, res: Response) => {
  await deleteImageService(req.params.id)
  return res.status(204).json({})
}
