import { Router } from 'express'
import {
  createSessionController,
  refreshSessionController,
  retrieveTokenController,
  sendEmailToRecovery,
  updatePasswordController,
  verifyPasswordController,
} from '../controllers'
import {
  validateSchemaBodyMiddleware,
  validateSchemaParamsMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  PasswordUpdateSchemaBody,
  PasswordVerifySchemaBody,
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

tokenRouter.get('', verifyUserIsAuthenticated, retrieveTokenController)

export const passwordRouter = Router()

passwordRouter.post(
  '',
  validateSchemaBodyMiddleware(RecoveryPasswordSchemaBody),
  sendEmailToRecovery,
)

passwordRouter.patch(
  '',
  validateSchemaBodyMiddleware(PasswordUpdateSchemaBody),
  updatePasswordController,
)

passwordRouter.post(
  '/verify',
  verifyUserIsAuthenticated,
  validateSchemaBodyMiddleware(PasswordVerifySchemaBody),
  verifyPasswordController,
)
