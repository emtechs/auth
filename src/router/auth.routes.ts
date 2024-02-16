import { Router } from 'express'
import {
  createSessionController,
  refreshSessionController,
  sendEmailToRecovery,
  updatePasswordController,
  verifyPasswordController,
  verifyTokenController,
} from '../controllers'
import {
  validateSchemaBodyMiddleware,
  validateSchemaParamsMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  PasswordUpdateSchemaBody,
  PasswordUpdateSchemaParams,
  RecoveryPasswordSchemaBody,
  SessionSchemaBody,
  TokenSchemaParams,
} from '../schemas'

export const sessionRouter = Router()

sessionRouter.post(
  '',
  validateSchemaBodyMiddleware(SessionSchemaBody),
  createSessionController,
)

export const tokenRouter = Router()

tokenRouter.post(
  '/:token',
  validateSchemaParamsMiddleware(TokenSchemaParams),
  refreshSessionController,
)

tokenRouter.get(
  '/:token',
  validateSchemaParamsMiddleware(TokenSchemaParams),
  verifyTokenController,
)

export const passwordRouter = Router()

passwordRouter.post(
  '',
  validateSchemaBodyMiddleware(RecoveryPasswordSchemaBody),
  sendEmailToRecovery,
)

passwordRouter.post(
  '/:userId/:token',
  validateSchemaParamsMiddleware(PasswordUpdateSchemaParams),
  validateSchemaBodyMiddleware(PasswordUpdateSchemaBody),
  updatePasswordController,
)

passwordRouter.post(
  '/verify',
  verifyUserIsAuthenticated,
  validateSchemaBodyMiddleware(PasswordUpdateSchemaBody),
  verifyPasswordController,
)
