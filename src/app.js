const Koa = require('koa');
const multer = require('@koa/multer');
const path = require('path');
const koaStatic = require('koa-static');
const helmet = require('koa-helmet');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('koa-cors');

const config = require('./config').value;

const app = new Koa();
app.keys = ['meta-storage-secret-key'];
app.proxy = true;
app.use(helmet());
// app.use(cookie());
if (config.jwt.enabled) {
  console.log(config.jwt.publicKey);

  app.use(async (ctx, next) => {
    const accessToken = ctx.cookies.get(config.jwt.accessTokenName);
    console.log(`accessToken: ${accessToken}`);
    // const jwtPayload = jsonwebtoken.decode(accessToken);
    // console.log(jwtPayload);
    if (!accessToken) {
      ctx.throw(401);
    }
    try {
      const result = jsonwebtoken.verify(accessToken, config.jwt.publicKey, {
        ignoreExpiration: true,
        algorithms: ['RS256', 'RS384'],
      });
      console.log(result);
      if (result && result.sub) {
        ctx.user = {
          id: +result.sub,
          username: result.username,
          instance: result.iss
        };
        console.log('ctx.user', ctx.user);
        await next();
      }
    } catch (err) {
      console.error(err);
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
