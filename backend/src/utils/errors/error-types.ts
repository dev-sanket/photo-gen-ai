import { ErrorCode } from '../../enums'
import { APIError } from './api-error'

export class BadRequestError extends APIError {
  constructor(
    description = 'Bad Request',
    errorCode = ErrorCode.BAD_REQUEST,
    context?: Record<string, any>
  ) {
    super('BAD_REQUEST_ERROR', 400, errorCode, description, true, context)
  }
}

export class ValidationError extends BadRequestError {
  constructor(description = 'Validation Error', context?: Record<string, any>) {
    super(description, ErrorCode.VALIDATION_ERROR, context)
  }
}

export class UnauthorizedError extends APIError {
  constructor(
    description = 'Unauthorized',
    errorCode = ErrorCode.UNAUTHORIZED,
    context?: Record<string, any>
  ) {
    super('UNAUTHORIZED_ERROR', 401, errorCode, description, true, context)
  }
}

export class InvalidCredentialsError extends UnauthorizedError {
  constructor(
    description = 'Invalid credentials provided',
    context?: Record<string, any>
  ) {
    super(description, ErrorCode.INVALID_CREDENTIALS, context)
  }
}

export class TokenExpiredError extends UnauthorizedError {
  constructor(
    description = 'Authentication token has expired',
    context?: Record<string, any>
  ) {
    super(description, ErrorCode.TOKEN_EXPIRED, context)
  }
}

export class ForbiddenError extends APIError {
  constructor(
    description = 'Forbidden',
    errorCode = ErrorCode.FORBIDDEN,
    context?: Record<string, any>
  ) {
    super('FORBIDDEN_ERROR', 403, errorCode, description, true, context)
  }
}

export class InsufficientPermissionsError extends ForbiddenError {
  constructor(
    description = 'Insufficient permissions',
    context?: Record<string, any>
  ) {
    super(description, ErrorCode.INSUFFICIENT_PERMISSIONS, context)
  }
}

export class NotFoundError extends APIError {
  constructor(
    description = 'Not Found',
    errorCode = ErrorCode.NOT_FOUND,
    context?: Record<string, any>
  ) {
    super('NOT_FOUND_ERROR', 404, errorCode, description, true, context)
  }
}
export class InternalServerError extends APIError {
  constructor(
    description = 'Internal Server Error',
    errorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    context?: Record<string, any>
  ) {
    super('INTERNAL_SERVER_ERROR', 500, errorCode, description, true, context)
  }
}

export class DatabaseError extends InternalServerError {
  constructor(
    description = 'Database error occurred',
    context?: Record<string, any>
  ) {
    super(description, ErrorCode.DATABASE_ERROR, context)
  }
}

export class ResourceNotFoundError extends NotFoundError {
  constructor(
    resource: string,
    id?: string | number,
    context?: Record<string, any>
  ) {
    const description = id
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`
    super(description, ErrorCode.RESOURCE_NOT_FOUND, {
      resource,
      id,
      ...context
    })
  }
}
