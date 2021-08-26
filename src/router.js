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

router.get('/metrics', async (ctx) => {
  ctx.body = {
    "cors.origin": config.cors.origin,
    "logger.level": config.logger.level,
    "node.env": config.node.env,
    "upload.maxSize": config.upload.maxSize,
  };
});

module.exports = router;
