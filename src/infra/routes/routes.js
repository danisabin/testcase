'use strict';

module.exports = ({
  defaultRoutes,
  healthChecksRoutes,
}) => [
  ...defaultRoutes,
  ...healthChecksRoutes,
];
