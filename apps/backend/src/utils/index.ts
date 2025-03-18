import Logger from './logger'
import { asyncHandler } from './async-handler'
import { bindControllerMethods } from './controller-utils'
const logger = Logger.getInstance()

export { logger, asyncHandler, bindControllerMethods }
