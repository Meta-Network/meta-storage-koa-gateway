const Router = require('@koa/router');
const _ = new Router();
_.get('/hello', async (ctx) => {
  ctx.body = 'Hello, Fleek';
});
const subRouters = ['storage'];
subRouters.forEach((subRouterName) => {
  _.use(`/${subRouterName}`, require(`./${subRouterName}`).routes());
});
module.exports = _;
