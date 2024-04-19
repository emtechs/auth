import { Request, Response } from 'express'
import {
  createSessionService,
  refreshSessionService,
  sendEmailRecoveryService,
  updatePasswordService,
  verifyPasswordService,
  verifyTokenRefreshService,
  verifyUserService,
} from '../services'

export const createSessionController = async (req: Request, res: Response) => {
  const token = await createSessionService(req.body)

  return res.status(201).json(token)
}

export const refreshSessionController = async (req: Request, res: Response) => {
  const id = verifyTokenRefreshService(req.params.token)
  const user = await verifyUserService(id)
  const token = refreshSessionService(user)

  return res.status(201).json(token)
}

export const retrieveTokenController = (req: Request, res: Response) => {
  return res.json(req.user.id)
}

export const sendEmailToRecovery = async (req: Request, res: Response) => {
  const user = await sendEmailRecoveryService(req.body)

  return res.status(201).json(user)
}

export const updatePasswordController = async (req: Request, res: Response) => {
  const user = await updatePasswordService(req.body)

  return res.json(user)
}

export const verifyPasswordController = async (req: Request, res: Response) => {
  await verifyPasswordService(req.body, req.user.id)

  return res.json({})
}
