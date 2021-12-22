'use strict';

module.exports = ({
  responsesService,
}) => ({
  livenessOk: responsesService.createInternalResponse(200, 'HLTH2001', 'Liveness successfully!'),
  readinessOk: responsesService.createInternalResponse(200, 'HLTH2002', 'Readiness successfully!'),
  impossibleGetReadiness: responsesService.createInternalResponse(503, 'HLTH5031', 'Impossible get readiness'),
});
