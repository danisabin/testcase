'use strict';

module.exports = () => ({
  createGeneralError(err) {
    return {
      statusCode: err.statusCode || 500,
      body: {
        statusCode: err.statusCode,
        code: err.code || '50000',
        message: err.message,
      },
    };
  },
});
