'use strict';

const config = require('../../config');

module.exports = ({
  Hapi,
  HapiSwagger,
  Inert,
  Vision,
  loggingService,
}) => async (routes) => {
  try {
    // server
    const server = Hapi.server({
      port: config.port,
      host: config.host,
      routes: {
        cors: true,
      },
    });

    // plugins
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: config.swagger.options,
      },
    ]);

    // routes
    for (const route in routes) {
      server.route(routes[route]);
    }

    await server.start();
    loggingService.info(__filename, 'init', `Server running on ', ${server.info.uri}`);
  } catch (err) {
    loggingService.error(__filename, 'init', `Error ', ${err}`);
  }
};
