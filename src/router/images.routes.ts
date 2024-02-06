import { Router } from 'express'
import {
  createImageProfileController,
  deleteImageController,
} from '../controllers'
import { upload } from '../lib'
import { verifyUserIsAuthenticated } from '../middlewares'

export const imageRouter = Router()

imageRouter.post(
  '',
  verifyUserIsAuthenticated,
  upload.single('image'),
  createImageProfileController,
)

imageRouter.delete('/:id', verifyUserIsAuthenticated, deleteImageController)
