const Koa = require('koa');
const app = new Koa();
app.proxy = true;
const _ = require('./router');
app.use(_.routes(), _.allowedMethods());
module.exports = app;
