import { Router } from 'express'
import {
  createUserController,
  deleteUserController,
  listUserController,
  profileUserController,
  retrieveNameUserController,
  retrieveUserController,
  updateUserController,
} from '../controllers'
import {
  validateSchemaBodyMiddleware,
  validateSchemaParamsMiddleware,
  verifyIsSuper,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  UserCreateSchemaBody,
  UserIdSchemaParams,
  UserUpdateRequestSchemaBody,
} from '../schemas'

export const userRouter = Router()

userRouter.post(
  '',
  validateSchemaBodyMiddleware(UserCreateSchemaBody),
  (req, res, next) => {
    if (req.headers.authorization)
      return verifyUserIsAuthenticated(req, res, next)
    return next()
  },
  createUserController,
)

userRouter.get('', verifyUserIsAuthenticated, verifyIsSuper, listUserController)

userRouter.get('/profile', verifyUserIsAuthenticated, profileUserController)

userRouter.get(
  '/:id',
  verifyUserIsAuthenticated,
  validateSchemaParamsMiddleware(UserIdSchemaParams),
  retrieveUserController,
)

userRouter.get(
  '/:id/name',
  verifyUserIsAuthenticated,
  validateSchemaParamsMiddleware(UserIdSchemaParams),
  retrieveNameUserController,
)

userRouter.patch(
  '/:id',
  verifyUserIsAuthenticated,
  validateSchemaParamsMiddleware(UserIdSchemaParams),
  validateSchemaBodyMiddleware(UserUpdateRequestSchemaBody),
  updateUserController,
)

userRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsSuper,
  validateSchemaParamsMiddleware(UserIdSchemaParams),
  deleteUserController,
)
