import { Router } from 'express'
import { createImageController, deleteImageController } from '../controllers'
import { upload } from '../lib'
import {
  validateSchemaParamsMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { ImageIdSchemaParams } from '../schemas'

export const imageRouter = Router()

imageRouter.post(
  '',
  verifyUserIsAuthenticated,
  upload.single('image'),
  createImageController,
)

imageRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  validateSchemaParamsMiddleware(ImageIdSchemaParams),
  deleteImageController,
)
