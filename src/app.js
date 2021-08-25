const Koa = require('koa');
const app = new Koa();
app.proxy = true;
app.use(async (ctx) => {
  ctx.body = 'Hello World!';
});
module.exports = app;
