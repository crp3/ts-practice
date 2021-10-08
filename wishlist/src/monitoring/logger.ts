import winston from 'winston';

import config from 'config/index';

const { SERVICE, LOG_LEVEL } = config;

const { combine, timestamp, json } = winston.format;

type LogLevels = { [index: string]: number; };

const logLevels: LogLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

const loggerOptions = {
  levels: logLevels,
  exitOnError: false,
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
};

const logger = winston.createLogger(loggerOptions);
logger.level = LOG_LEVEL;

const logEnabled = (level: number) =>
  LOG_LEVEL && logLevels[LOG_LEVEL] >= level;

export default {
  error: (message: string, metadata = {}) =>
    logEnabled(logLevels.error) && logger.error(message, {
      SERVICE,
      ...metadata,
    }),

  warn: (message: string, metadata = {}) =>
    logEnabled(logLevels.warn) && logger.warn(message, {
      SERVICE,
      ...metadata,
    }),

  info: (message: string, metadata = {}) =>
    logEnabled(logLevels.info) && logger.info(message, {
      SERVICE,
      ...metadata,
    }),

  debug: (message: string, metadata = {}) =>
    logEnabled(logLevels.debug) && logger.debug(message, {
      SERVICE,
      ...metadata,
    }),
};
