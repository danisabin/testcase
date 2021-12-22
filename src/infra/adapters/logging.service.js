'use strict';

const config = require('../../config');

module.exports = ({
  pino,
}) => {
  const logger = pino({
    level: config.logLevel,
    timestamp: () => `,"humanDate":"${new Date().toISOString()}"`,
  });

  function formatResponse(fileName, methodName, logItem) {
    return {
      filename: fileName.slice(fileName.lastIndexOf('/') + 1, -3),
      methodName,
      extra: JSON.stringify(logItem),
    };
  }

  return {
    debug(fileName, methodName, message, logItem) {
      return logger.debug(formatResponse(fileName, methodName, logItem), message);
    },
    info(fileName, methodName, message, logItem) {
      return logger.info(formatResponse(fileName, methodName, logItem), message);
    },
    warn(fileName, methodName, message, logItem) {
      return logger.warn(formatResponse(fileName, methodName, logItem), message);
    },
    error(fileName, methodName, message, logItem) {
      return logger.error(formatResponse(fileName, methodName, logItem), message);
    },
    fatal(fileName, methodName, message, logItem) {
      return logger.fatal(formatResponse(fileName, methodName, logItem), message);
    },
  };
};
