
const Koa = require('koa');
const multer = require('@koa/multer');
const path = require('path');
const koaStatic = require('koa-static');
const helmet = require('koa-helmet');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('koa-cors');

const config = require('./config').value;
const logger = require('./logger');

const app = new Koa();
app.keys = ['meta-storage-secret-key'];
app.proxy = true;
app.use(helmet());
if (config.jwt.enabled) {
  const parseAuthHeader = (hdrValue) => {
    if (typeof hdrValue !== 'string') {
      return null;
    }
    const matches = hdrValue.match(/(\S+)\s+(\S+)/);
    return matches && { scheme: matches[1], value: matches[2] };
  };
  const jwtFromRequestMethods = {
    cookie(ctx) {
      return ctx.cookies.get(config.jwt.accessTokenName);
    },
    authHeaderAsBearerToken(ctx) {

      const authHeader = ctx.get('Authorization');
      logger.debug(`authHeader: ${authHeader}`);
      if (!authHeader) {
        return undefined;
      }
      const authParams = parseAuthHeader(authHeader);
      if (authParams && authParams.scheme.toLowerCase() === 'bearer') {
        return authParams.value;
      }
      return undefined;

    }
  };
  app.use(async (ctx, next) => {
    const accessToken = jwtFromRequestMethods[config.jwt.fromRequest](ctx);
    logger.debug(`accessToken: ${accessToken}`);

    if (!accessToken) {
      ctx.throw(401);
    }
    try {
      const result = jsonwebtoken.verify(accessToken, config.jwt.publicKey, {
        ignoreExpiration: false,
        algorithms: ['RS256', 'RS384'],
      });
      logger.debug(`jwt verify result: ${result}`);
      if (!(result && result.sub && result.purpose === 'access_token')) {
        ctx.throw(401, 'invalid jwt purpose');
      }
      ctx.user = {
        id: +result.sub,
        username: result.username,
        instance: result.iss
      };
      logger.debug('ctx.user', ctx.user);
      await next();

    } catch (err) {
      logger.error(err);
      ctx.throw(401);
    }


  });
}
//app.use(require('./auth'));
app.use(koaStatic(path.join(__dirname)));
// app.use(cors({
// origin: config.cors.origin,
// allowedMethods: 'OPTIONS,HEAD,GET,POST,PUT,PATCH,DELETE'

// }));
app.use(cors());
const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  limits: { fileSize: config.upload.maxSize }
  // storage: multer.memoryStorage(),
}); // you can pass options here
app.use(upload.single('file'));
const router = require('./router');
app.use(router.routes(), router.allowedMethods());

module.exports = app;
