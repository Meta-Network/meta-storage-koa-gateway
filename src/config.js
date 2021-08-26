let envs = process.env;
const envPath = `.env.${envs.NODE_ENV}`;
require('dotenv').config({
  path: envPath,
});
let value;

const calculateValue = () => {
  value = {
    app: {
      port: +(envs.PORT) || 3000,
    },
    fleek: {
      storage: {
        api: {
          key: envs.FLEEK_STORAGE_API_KEY,
          secret: envs.FLEEK_STORAGE_API_SECRET,
        },
      },
    },
    logger: {
      level: envs.LOGGER_LEVEL || 'info',
    },
    node: {
      env: envs.NODE_ENV,
    },
    upload: {
      maxSize: +(envs.UPLOAD_MAX_SIZE) || 5 * 1024 * 1024
    }
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
