'use strict';

const _ = require('lodash');
const responses = require('../response/response');
const error = require('../error/error');


function wrap(controller) {
  return function (req, res, next) {
    try {
      controller(req, res, next)
        .tap(result => {
          res.result = result instanceof responses.responseType ?
            result :
            new responses.okResponse(result);
          next();
        })
        .catch(e => {
          next(error.mapError(e));
        });
    } catch (e) {
      next(error.mapError(e));
    }
  }
}

function wrapAll(obj) {
  return _.mapValues(obj, wrap);
}

const controllerWrapper = {
  wrap,
  wrapAll
};


module.exports = controllerWrapper;