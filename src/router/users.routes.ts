import { Router } from 'express'
import {
  createUserController,
  deleteUserController,
  listUserController,
  profileUserController,
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

userRouter.get('/profile', verifyUserIsAuthenticated, profileUserController)

userRouter.get('/:id', retrieveUserController)

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
