import { NextFunction, Request, Response } from 'express'
import { BaseError } from '../utils/errors/base-error'
import { logger, errorTypes } from '../utils'
import { finalResponseHandler } from './responseHandler.middleware'
import { ErrorCode } from '../enums'

const { InternalServerError } = errorTypes

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If the error is a custom error we've defined
  if (err instanceof BaseError) {
    const { name, httpCode, errorCode, message, isOperational, context } = err

    logger.error({
      name,
      httpCode,
      errorCode,
      message,
      stack: err.stack,
      isOperational,
      context,
      requestId: req.headers['x-request-id'] || 'unknown'
    })

    const errorResponse = res.locals.sendError(message, httpCode, {
      name,
      errorCode,
      context,
      stack: process.env.NODE_ENV === 'development' ? err?.stack : []
    })

    return finalResponseHandler(errorResponse, req, res, next)
  }

  // If the error is unexpected
  const internalError = new InternalServerError(
    'An unexpected error occurred',
    ErrorCode.UNEXPECTED_ERROR,
    {
      originalError: err.message
    }
  )

  logger.error({
    name: 'UNEXPECTED_ERROR',
    httpCode: 500,
    errorCode: ErrorCode.UNEXPECTED_ERROR,
    message: err.message,
    stack: err.stack,
    requestId: req.headers['x-request-id'] || 'unknown'
  })

  const errorResponse = res.locals.sendError(
    internalError.message,
    internalError.httpCode,
    {
      name: internalError.name,
      errorCode: internalError.errorCode,
      stack: process.env.NODE_ENV === 'development' ? err?.stack : []
    }
  )

  return finalResponseHandler(errorResponse, req, res, next)
}
