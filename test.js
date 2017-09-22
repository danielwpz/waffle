'use strict';

const Promise = require('bluebird');

const WaffleModule = require('./index');
const waffle = new WaffleModule({
  disable_log: [
    '/v1/status/health'
  ]
});

waffle.get('/hi', function (req, res) {
  return Promise.resolve({ hello: 'world' });
});

waffle.get('/echo/:name', function (req, res) {
  return Promise.resolve(req.params.name);
});

const v1Router = new WaffleModule.router();
v1Router.get('/echo/:job', function (req, res) {
  return Promise.resolve({ job: req.params.job });
});

const statusRouter = new WaffleModule.router();
statusRouter.get('/health', function (req, res) {
  return Promise.resolve({ health: 'ok' });
});

v1Router.use('/status', statusRouter);
waffle.use('/v1', v1Router);

waffle.run();
