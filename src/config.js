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
      origin: true,
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
      accessTokenName: 'access_token',
      enabled: true,
      fromRequest: 'authHeaderAsBearerToken',
      publicKey: envs.JWT_PUBLIC_KEY,
    },
    logger: {
      level: 'info',
    },
    metrics: {
      enabled: true,
    },
    modules: ['fleek'],
    node: {
      env: envs.NODE_ENV,
    },
    upload: {
      maxSize: 5 * 1024 * 1024,
    },
  };


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
