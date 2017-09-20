'use strict';

const serverError = require('./server_error');
const clientError = require('./client_error');

/**
 * Error type that corresponds to HTTP errors.
 *
 * This class and its sub-classes should be used by response middleware.
 *
 * @param serverError
 * @param clientError
 * @returns {{serverError: *, clientError: *}}
 */

module.exports = {
  serverError,
  clientError
};
