import Logger from './logger'
import { asyncHandler } from './async-handler'
import { bindControllerMethods } from './controller-utils'
import * as errorTypes from './errors/error-types'
const logger = Logger.getInstance()

export { logger, asyncHandler, bindControllerMethods, errorTypes }
