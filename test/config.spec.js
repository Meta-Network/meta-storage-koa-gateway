afterEach(() => {
  jest.resetModules();
});

describe('config value', () => {
  describe('app.port', () => {
    it('should be 3000 if environment variable PORT is not existed', async () => {
      delete process.env.PORT;
      const config = require('../src/config').value;
      expect(config.app.port).toBe(3000);
      delete process.env.PORT;
    });
    it('should be equal to environment variable PORT', async () => {
      process.env.PORT = 3333;

      const config = require('../src/config').value;
      expect(config.app.port).toBe(3333);

      delete process.env.PORT;
    });
  });
  describe('fleek.storage.api.key', () => {
    it('should be equal to environment variable FLEEK_STORAGE_API_KEY', async () => {
      process.env.FLEEK_STORAGE_API_KEY = 'key1';

      const config = require('../src/config').value;
      expect(config.fleek.storage.api).toMatchObject({
        key: 'key1',
      });

      delete process.env.FLEEK_STORAGE_API_KEY;
    });
  });
  describe('logger.level', () => {
    it('should be equal to environment variable LOGGER_LEVEL', async () => {
      process.env.LOGGER_LEVEL = 'info';
      const config = require('../src/config').value;
      expect(config.logger.level).toBe('info');
      delete process.env.LOGGER_LEVEL;
    });
  });
  describe('node.env', () => {
    it('should be equal to environment variable NODE_ENV', async () => {
      const config = require('../src/config').value;
      expect(config.node.env).toBe('test');
    });
  });

  describe('set value', () => {
    it('config value should matches envs param', async () => {
      const config = require('../src/config');
      const envs = {
        PORT: 2345,
        FOO: 'abc',
        BAR: 'def',
      };
      config.set(envs);
      const { value } = config;
      expect(value.app.port).toBe(2345);
      expect(value.fleek.storage.api.key).toBeUndefined();
      for (let key of Object.keys(envs)) {
        delete process.env[key];
      }
    });
  });
});
