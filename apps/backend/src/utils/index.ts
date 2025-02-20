import Logger from "./logger";
import {asyncHandler} from "./asyncHandler";

const logger = Logger.getInstance();

export {
    logger,
    asyncHandler
}