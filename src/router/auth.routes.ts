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
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  PasswordUpdateSchema,
  RecoveryPasswordSchema,
  SessionSchema,
} from '../schemas'

export const sessionRouter = Router()

sessionRouter.post(
  '',
  validateSchemaMiddleware(SessionSchema),
  createSessionController,
)

export const tokenRouter = Router()

tokenRouter.post('', verifyUserIsAuthenticated, refreshSessionController)

tokenRouter.get('/:token', verifyTokenController)

export const passwordRouter = Router()

passwordRouter.post(
  '',
  validateSchemaMiddleware(RecoveryPasswordSchema),
  sendEmailToRecovery,
)

passwordRouter.post(
  '/:userId/:token',
  validateSchemaMiddleware(PasswordUpdateSchema),
  updatePasswordController,
)

passwordRouter.post(
  '/verify',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(PasswordUpdateSchema),
  verifyPasswordController,
)
