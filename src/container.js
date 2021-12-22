'use strict';

const { createContainer, Lifetime, asValue } = require('awilix');
const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Joi = require('joi');
const pg = require('pg');
const pino = require('pino');

const container = createContainer();

container.register({
  Hapi: asValue(Hapi),
  HapiSwagger: asValue(HapiSwagger),
  Inert: asValue(Inert),
  Vision: asValue(Vision),
  pino: asValue(pino),
  Joi: asValue(Joi),
  pg: asValue(pg),
});

container.loadModules([
  `${__dirname}/services/**/*.service.js`,
  `${__dirname}/domain/**/*.{repository,responses,service}.js`,
  `${__dirname}/infra/**/*.js`,
], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
});

module.exports = container;
