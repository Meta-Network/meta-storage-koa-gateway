const Router = require('@koa/router');
const _ = new Router();
_.get(
  '/',
  async (ctx) => (ctx.body = `Hello,Fleek Storage for ${ctx.query.who}`),
);
module.exports = _;
