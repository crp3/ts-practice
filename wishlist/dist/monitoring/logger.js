"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../config"));
const { SERVICE, LOG_LEVEL } = config_1.default;
const { combine, timestamp, json } = winston_1.default.format;
const logLevels = {
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
    transports: [new winston_1.default.transports.Console()],
};
const logger = winston_1.default.createLogger(loggerOptions);
logger.level = LOG_LEVEL;
const logEnabled = (level) => LOG_LEVEL && logLevels[LOG_LEVEL] >= level;
exports.default = {
    error: (message, metadata = {}) => logEnabled(logLevels.error) && logger.error(message, Object.assign({ SERVICE }, metadata)),
    warn: (message, metadata = {}) => logEnabled(logLevels.warn) && logger.warn(message, Object.assign({ SERVICE }, metadata)),
    info: (message, metadata = {}) => logEnabled(logLevels.info) && logger.info(message, Object.assign({ SERVICE }, metadata)),
    debug: (message, metadata = {}) => logEnabled(logLevels.debug) && logger.debug(message, Object.assign({ SERVICE }, metadata)),
};
//# sourceMappingURL=logger.js.map