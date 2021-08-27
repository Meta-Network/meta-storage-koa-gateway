let envs = process.env;
const envPath = `.env.${envs.NODE_ENV}`;
require('dotenv').config({
  path: envPath,
});
let value;

const calculateValue = () => {
  value = {
    app: {
      port: +envs.PORT || 3000,
    },
    cors: {
      origin: envs.CORS_ORIGIN || '*',
      credentials: envs.CORS_CREDENTIALS || false,
      allowMethods: envs.CORS_ALLOW_METHODS || 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    fleek: {
      storage: {
        api: {
          key: envs.FLEEK_STORAGE_API_KEY,
          secret: envs.FLEEK_STORAGE_API_SECRET,
        },
      },
    },
    jwt: {
      accessTokenName: envs.JWT_ACCESS_TOKEN_NAME,
      enabled: 'true' === envs.JWT_ENABLED,
      fromRequest: envs.JWT_FROM_REQUEST,
      publicKey: envs.JWT_PUBLIC_KEY,
    },
    logger: {
      level: envs.LOGGER_LEVEL || 'info',
    },
    metrics: {
      enabled: 'true' === envs.METRICS_ENABLED,
    },
    node: {
      env: envs.NODE_ENV,
    },
    upload: {
      maxSize: +envs.UPLOAD_MAX_SIZE || 5 * 1024 * 1024,
    },
  };

  if (envs.MODULES) {
    value.modules = envs.MODULES.split(',')
      .map((moduleName) => moduleName.trim())
      .filter((moduleName) => moduleName !== '');
  }
};
calculateValue();

module.exports = {
  set: (env) => {
    envs = Object.assign(process.env, env);
    calculateValue();
  },
  get value() {
    return value;
  },
};
