'use strict';

module.exports = ({
  loggingService,
  pgService,
  healthResponses,
}) => ({
  checkLiveness() {
    loggingService.info(__filename, 'checkLiveness', 'liveness working as expected');
    return true;
  },

  async checkReadiness() {
    try {
      await pgService.query({sql: 'SELECT 1'});
      loggingService.info(__filename, 'checkReadiness', 'readiness working as expected');
    } catch (error) {
      loggingService.error(__filename, 'checkReadiness', error);
      throw healthResponses.impossibleGetReadiness;
    }
  },
});
