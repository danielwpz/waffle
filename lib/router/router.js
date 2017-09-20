'use strict';

const express = require('express');
const controllerWrapper = require('../util/controller_wrapper');

class Router {

  constructor() {
    this.router = express.Router();
  }

  use(path, router) {
    this.router.use(path, router.router);
    return this;
  }

  get(path, controller) {
    this.router.get(path, controllerWrapper.wrap(controller));
    return this;
  }

  post(path, controller) {
    this.router.post(path, controllerWrapper.wrap(controller));
    return this;
  }

}

module.exports = Router;