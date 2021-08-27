const config = require('./config').value;
const Router = require('@koa/router');
const router = new Router();

// autoscan router modules
if (config.modules) {
  for (const moduleName of config.modules) {
    const moduleRouter = require(`./routes/${moduleName}/index`);
    router.use(`/${moduleName}`, moduleRouter.routes());
  }
}

// index
router.get('/', async (ctx) => {
  ctx.body = 'Hello, Meta Storage';
});
router.get('/robots.txt', async (ctx) => {
  ctx.set('Content-Type', 'text/plain');
  ctx.body = 'User-agent: *\nDisallow: /';
});

if (config.metrics.enabled) {
  router.get('/metrics', async (ctx) => {
    ctx.body = {
      "cors.origin": config.cors.origin,
      "logger.level": config.logger.level,
      "jwt.accessTokenName": config.jwt.accessTokenName,
      "jwt.enabled": config.jwt.enabled,
      "jwt.publicKey": config.jwt.publicKey,
      "node.env": config.node.env,
      "upload.maxSize": config.upload.maxSize,
    };
  });
}

router.get('/users/me', async (ctx) => {
  ctx.body = ctx.user;
});

module.exports = router;
