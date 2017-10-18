'use strict';

const logger = require('winston');

function requestLogMiddleware(config) {

  const log = function (req, res, next) {
    req._reqTime = Date.now();

    if (!config.disable_log || !config.disable_log.some(path => req.url.startsWith(path))) {
      logger.info(`[waffle] ${req.method}  ${req.originalUrl}`);
    }

    next();
  };

  return log;
}

module.exports = requestLogMiddleware;