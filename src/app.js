const Koa = require('koa');
const path = require('path');
const koaStatic = require('koa-static');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');

const config = require('./config').value;

const app = new Koa();
app.keys = ['meta-storage-secret-key'];
app.proxy = true;
app.use(helmet());
app.use(
  cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
    allowMethods: config.cors.allowMethods,
  }),
);

app.use(koaStatic(path.join(__dirname)));
const router = require('./router');
app.use(router.routes(), router.allowedMethods());

module.exports = app;
