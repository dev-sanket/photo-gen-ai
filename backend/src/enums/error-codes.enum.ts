export enum ErrorCode {
  // 400 Bad Request errors
  BAD_REQUEST = 'ERR_BAD_REQUEST',
  VALIDATION_ERROR = 'ERR_VALIDATION',
  INVALID_INPUT = 'ERR_INVALID_INPUT',
  MISSING_PARAMETER = 'ERR_MISSING_PARAMETER',

  // 401 Unauthorized errors
  UNAUTHORIZED = 'ERR_UNAUTHORIZED',
  INVALID_CREDENTIALS = 'ERR_INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'ERR_TOKEN_EXPIRED',

  // 403 Forbidden errors
  FORBIDDEN = 'ERR_FORBIDDEN',
  ACCESS_DENIED = 'ERR_ACCESS_DENIED',
  INSUFFICIENT_PERMISSIONS = 'ERR_INSUFFICIENT_PERMISSIONS',

  // 404 Not Found errors
  NOT_FOUND = 'ERR_NOT_FOUND',
  RESOURCE_NOT_FOUND = 'ERR_RESOURCE_NOT_FOUND',
  ROUTE_NOT_FOUND = 'ERR_ROUTE_NOT_FOUND',

  // 409 Conflict errors
  CONFLICT = 'ERR_CONFLICT',
  DUPLICATE_ENTRY = 'ERR_DUPLICATE_ENTRY',

  // 422 Unprocessable Entity errors
  UNPROCESSABLE_ENTITY = 'ERR_UNPROCESSABLE_ENTITY',

  // 429 Too Many Requests errors
  TOO_MANY_REQUESTS = 'ERR_TOO_MANY_REQUESTS',
  RATE_LIMIT_EXCEEDED = 'ERR_RATE_LIMIT_EXCEEDED',

  // 500 Internal Server Error errors
  INTERNAL_SERVER_ERROR = 'ERR_INTERNAL_SERVER',
  DATABASE_ERROR = 'ERR_DATABASE',
  UNEXPECTED_ERROR = 'ERR_UNEXPECTED'
}
