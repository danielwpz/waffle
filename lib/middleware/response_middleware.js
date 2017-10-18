'use strict';

const logger = require('winston');
const colors = require('colors/safe');

const error = require('../error/error');
const httpError = require('../error/internal/http_error');
const envUtil = require('../util/env_util');


/**
 * Respond with normal response
 */
function respondMiddleware(config) {

  const respond = function (req, res, next) {
    const response = res.result;

    if (response) {

      if (!config.disable_log || !config.disable_log.some(path => req.url.startsWith(path))) {
        logger.info(`[waffle] ${colors.green('' + response.code)}  ${req.method}  ${req.originalUrl} ${getProcessTime(req)}ms`);
      }

      res.status(response.code).json(response.data);
      next();
    } else {
      // not found
      next(new httpError.clientError.NotFoundError());
    }
  };

  return respond;
}

/**
 * Respond with error
 * @param err
 * @param req
 * @param res
 * @param next
 */
function respondError(err, req, res, next) {
  let errorObject = {
    code: err.code || 500,
    message: err.message || 'Internal error'
  };

  if (envUtil.nodeEnv.isDevelopment() && err.error) {
    errorObject._error = err.error.message;
    errorObject._stack = err.error.stack;
  }

  if (errorObject.code >= 500) {
    logger.error(err);
    logger.error(err.error);
    logger.info(`[waffle] ${colors.red('' + errorObject.code)}  ${req.method}  ${req.originalUrl} ${getProcessTime(req)}ms`);
  } else {
    logger.info(`[waffle] ${errorObject.code}  ${req.method}  ${req.originalUrl} ${getProcessTime(req)}ms`);
  }

  res.status(errorObject.code).json(errorObject);
}

function getProcessTime(req) {
  return Date.now() - req._reqTime;
}

const middleware = {
  respondMiddleware,
  respondError
};


module.exports = middleware;