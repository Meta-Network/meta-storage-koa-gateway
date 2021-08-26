const Router = require('@koa/router');
const routerHelper = require('../helper');
const router = new Router();
router.get('/hello', async (ctx) => {
  ctx.body = 'Hello, Fleek';
});
['storage'].forEach((subRouterName) => {
  const controller = require(`./${subRouterName}`);
  routerHelper.restfulMapping(router, subRouterName, controller);
});

module.exports = router;
