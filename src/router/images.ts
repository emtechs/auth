import { Router } from 'express'
import {
  createImageController,
  deleteImageController,
  uploadImageController,
} from '../controllers'
import { upload } from '../lib'
import {
  validateSchemaBodyMiddleware,
  validateSchemaParamsMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { ImageCreateSchemaBody, ImageIdSchemaParams } from '../schemas'

export const imageRouter = Router()

imageRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaBodyMiddleware(ImageCreateSchemaBody),
  createImageController,
)

imageRouter.post(
  '/upload',
  verifyUserIsAuthenticated,
  upload.single('image'),
  uploadImageController,
)

imageRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  validateSchemaParamsMiddleware(ImageIdSchemaParams),
  deleteImageController,
)
