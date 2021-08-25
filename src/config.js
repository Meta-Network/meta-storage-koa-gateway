
let envs = process.env;
let envPath = `.env.${envs.NODE_ENV}`;
require('dotenv').config({
  path: envPath
});
let value;

const calculateValue = () => {
  value = {
    app: {
      port: Number(envs.PORT) || 3000,
    },
    fleek: {
      storage: {
        api: {
          key: envs.FLEEK_STORAGE_API_KEY,
        },
      },
    },
    logger: {
      level: envs.LOGGER_LEVEL || 'info',
    },
    node: {
      env: envs.NODE_ENV
    }
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
