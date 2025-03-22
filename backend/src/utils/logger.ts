import winston from "winston";

class Logger {
  private static instance: winston.Logger;

  private constructor() {} // Private constructor to prevent instantiation

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
          winston.format.printf(({ timestamp, level, message, ...meta }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message} ${meta.length ? `Data: ${JSON.stringify(meta)}` : ''}`;
          })
        ),
        transports: [
          new winston.transports.Console(),
        //   new winston.transports.File({ filename: "app.log" }),
        ],
      });
    }
    return Logger.instance;
  }
}

export default Logger;
