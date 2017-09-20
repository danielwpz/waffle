'use strict';

const logger = require('winston');

function log(req, res, next) {
  req._reqTime = Date.now();
  logger.info(`[waffle] ${req.method}  ${req.originalUrl}`);
  next();
}

module.exports = log;