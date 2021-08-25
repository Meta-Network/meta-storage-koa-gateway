const Router = require('@koa/router');
const _ = new Router();

const routes = require('require-all')({
  dirname: __dirname + '/routes',
  filter: /^index\.js$/,
});

for (const moduleName in routes) {
  const routerModule = routes[moduleName];
  for (const routerName in routerModule) {
    _.use(`/${moduleName}`, routerModule[routerName].routes());
  }
}

// index
_.get('/hello', async (ctx) => {
  ctx.body = 'Hello, Meta Storage';
});
_.get('/robots.txt', async (ctx) => {
  ctx.set('Content-Type', 'text/plain');
  ctx.body = 'User-agent: *\nDisallow: /';
});

module.exports = _;
