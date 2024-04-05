import { ZodTypeAny } from 'zod/lib'
import { NextFunction, Request, Response } from 'express'

export const validateSchemaParamsMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const paramsValidated = schema.parse(req.params)

    req.params = paramsValidated

    return next()
  }
