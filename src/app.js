const Koa = require('koa');
const multer = require('@koa/multer');
const path = require('path');
const koaStatic = require('koa-static');
const helmet = require('koa-helmet');
const cors = require('koa-cors');

const config = require('./config').value;

const app = new Koa();
app.proxy = true;
app.use(helmet());
app.use(koaStatic(path.join(__dirname)));
app.use(cors({
  origin: config.cors.origin
}));
const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  limits: { fileSize: config.upload.maxSize }
  // storage: multer.memoryStorage(),
}); // you can pass options here
app.use(upload.single('file'));
const _ = require('./router');
app.use(_.routes(), _.allowedMethods());

module.exports = app;
