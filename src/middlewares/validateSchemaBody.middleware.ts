import { ZodTypeAny } from 'zod/lib'
import { NextFunction, Request, Response } from 'express'

export const validateSchemaBodyMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const bodyValidated = schema.parse(req.body)

    req.body = bodyValidated

    return next()
  }
