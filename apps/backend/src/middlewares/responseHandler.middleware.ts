import { Request, Response, NextFunction } from "express";

// Middleware to attach response helper
export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.locals.sendResponse = (data: any, message = "Success", status = 200) => {
    return { message, data, status };
  };

  res.locals.sendError = (message = "Error", status = 500, error?: any) => {
    return { message, error: process.env.NODE_ENV === "development" ? error : undefined, status };
  };

  next();
};

// Final middleware to send all responses
export const finalResponseHandler = (result: any, req: Request, res: Response, next: NextFunction) => {
  if (!result || typeof result !== "object") return next();

  const { success, message, data, error, status } = result;

  res.status(status || 200).json({
    success,
    message,
    ...(success ? { data } : { error }),
  });
};

