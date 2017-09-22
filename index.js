'use strict';

const express = require('express');
const app = express();
const loggerConfig = require('./lib/util/log_config');
const logger = require('winston');

const compression  = require('compression');
const bodyParser = require('body-parser');

const error = require('./lib/error/error');
const requestLogMiddleware = require('./lib/middleware/request_log_middleware');
const responseMiddleware = require('./lib/middleware/response_middleware');
const router = require('./lib/router/router');

require('./lib/util/logger')(loggerConfig);

class Waffle extends router {

  constructor(config) {
    super();

    this.config = config || {};

    app.use(compression());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(requestLogMiddleware(this.config));
  }

  run(port) {
    port = port || this.config.port || 8080;

    app.use(this.router);

    app.use(responseMiddleware.respondMiddleware(this.config));
    app.use(responseMiddleware.respondError);

    app.listen(port, function () {
      logger.notice(`Server running on port ${port} ...`);
    });
  }
}

Waffle.error = error;
Waffle.router = router;

module.exports = Waffle;