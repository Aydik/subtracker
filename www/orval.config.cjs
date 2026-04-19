const path = require('path');

const SERVICES = {
  analyticsService: './swagger/analytics-service.json',
  subscriptionService: './swagger/subscription-service.json',
  userService: './swagger/user-service.json',
};

const SHARED_OUTPUT = {
  mode: 'tags-split',
  client: 'axios',
  clean: false,
  override: {
    mutator: {
      path: path.resolve(__dirname, '../src/api/axiosInstance.ts'),
      name: 'customAxios',
    },
    query: {
      useQuery: true,
      useInfinite: true,
      useSuspenseQuery: true,
    },
  },
};

module.exports = Object.entries(SERVICES).reduce((config, [serviceName, inputRelativePath]) => {
  config[serviceName] = {
    input: path.resolve(__dirname, inputRelativePath),
    output: {
      ...SHARED_OUTPUT,
      target: path.resolve(__dirname, `../src/api/endpoints`),
      schemas: path.resolve(__dirname, `../src/api/models`),
    },
  };
  return config;
}, {});
