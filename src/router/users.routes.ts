import { Router } from 'express'
import {
  createUserController,
  deleteUserController,
  listUserController,
  retrieveUserController,
  updateUserController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsSuper,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { UserCreateSchema, UserUpdateRequestSchema } from '../schemas'

export const userRouter = Router()

userRouter.post(
  '',
  validateSchemaMiddleware(UserCreateSchema),
  (req, res, next) => {
    if (req.headers.authorization)
      return verifyUserIsAuthenticated(req, res, next)
    return next()
  },
  createUserController,
)

userRouter.get('', verifyUserIsAuthenticated, verifyIsSuper, listUserController)

userRouter.get('/:id', verifyUserIsAuthenticated, retrieveUserController)

userRouter.patch(
  '/:id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(UserUpdateRequestSchema),
  updateUserController,
)

userRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsSuper,
  deleteUserController,
)
