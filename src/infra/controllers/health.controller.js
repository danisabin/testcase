'use strict';

module.exports = ({
  errorService,
  healthResponses,
  healthService,
  loggingService,
  responsesService,
}) => ({
  liveness(request, h) {
    let response;
    try {
      healthService.checkLiveness();
      response = responsesService.createResponseData(
        healthResponses.livenessOk,
      );
    } catch (error) {
      loggingService.error(__filename, 'liveness', 'error', error);
      response = errorService.createGeneralError(error);
    }
    return h.response(response.body).code(response.statusCode);
  },

  async readiness(request, h) {
    let response;
    try {
      await healthService.checkReadiness();
      response = responsesService.createResponseData(
        healthResponses.readinessOk,
      );
    } catch (error) {
      loggingService.error(__filename, 'readiness', 'error', error);
      response = errorService.createGeneralError(error);
    }
    return h.response(response.body).code(response.statusCode);
  },
});
