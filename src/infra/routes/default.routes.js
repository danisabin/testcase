'use strict';

module.exports = ({
  loggingService,
}) => [
  {
    method: '*',
    path: '/{any*}',
    options: {
      auth: false,
      description: '404 Not found',
      handler: (request, h) => {
        loggingService.debug(__filename, 'routes', '404 not found!!');
        return h.response({
          statusCode: 404,
          code: 'NTFND404',
          message: 'Resource not found',
        }).code(404);
      },
    },
  },
];
