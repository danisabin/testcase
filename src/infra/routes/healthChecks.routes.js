'use strict';

module.exports = ({
  healthController,
  healthDocs,
}) => [
  {
    method: 'GET',
    path: '/__health/liveness',
    options: {
      auth: false,
      description: 'Liveness healthcheck',
      handler: healthController.liveness,
      plugins: {
        'hapi-swagger': {
          responses: healthDocs.liveness.responses,
        },
      },
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/__health/readiness',
    options: {
      auth: false,
      description: 'Readiness healthcheck',
      handler: healthController.readiness,
      plugins: {
        'hapi-swagger': {
          responses: healthDocs.readiness.responses,
        },
      },
      tags: ['api'],
    },
  },
];
