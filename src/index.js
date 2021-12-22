'use strict';

const container = require('./container');

const server = container.resolve('serverService');
const routes = container.resolve('routes');

server(routes);
