import { Request, Response, NextFunction } from 'express'
import { Schema } from 'zod'
import { ZodSchema } from 'zod'

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next:NextFunction) => {
  try {
    const toValidate = {
      body : req.body,
      query : req.query,
      params : req.params
    }
    schema.parse(toValidate.body)
    next();
  } catch (err) {
    return res.status(400).json({message: "Error in form data", error: err})
  }
}