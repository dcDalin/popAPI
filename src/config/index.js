const config = {
  production: {
    APP_PORT: '4001',
    APP_SECRET: 'someappsecrethere',
    MONGO_URL: '',
    PLAYGROUND: true,
  },
  development: {
    APP_PORT: '4001',
    APP_SECRET: 'someappsecrethere',
    MONGO_URL: '',
    PLAYGROUND: true,
  },
  default: {
    APP_PORT: '4001',
    APP_SECRET: 'someappsecrethere',
    MONGO_URL: '',
    PLAYGROUND: true,
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
