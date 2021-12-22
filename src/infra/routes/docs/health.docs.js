'use strict';

module.exports = ({
  Joi,
}) => ({
  liveness: {
    responses: {
      200: {
        description: 'Liveness is working',
        schema: Joi.object({
          statusCode: Joi.number().valid(200),
          code: Joi.string().example('HLTH2001'),
          message: Joi.string().example('Liveness successfully!'),
        }).label('liveness'),
      },
    },
  },
  readiness: {
    responses: {
      200: {
        description: 'Readiness is working',
        schema: Joi.object({
          statusCode: Joi.number().valid(200),
          code: Joi.string().example('HLTH2002'),
          message: Joi.string().example('Readiness successfully!'),
        }).label('readiness'),
      },
      503: {
        description: 'Readiness is unavailable',
        schema: Joi.object({
          statusCode: Joi.number().valid(503),
          code: Joi.string().example('HLTH5000'),
          message: Joi.string().example('Impossible get readiness'),
        }).label('readiness'),
      },
    },
  },
});
