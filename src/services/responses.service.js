'use strict';

module.exports = () => ({
  createResponseData(result, data) {
    const response = {
      statusCode: result.statusCode,
      body: {
        statusCode: result.statusCode,
        code: result.code,
        message: result.message,
      },
    };
    data ? response.body.data = data : false;
    return response;
  },
  createInternalResponse(statusCode, code, message) {
    return {
      statusCode,
      code,
      message,
    };
  },
});
