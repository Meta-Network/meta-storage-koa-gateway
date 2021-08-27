const multer = require('@koa/multer');

const config = require('../config').value;

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  limits: { fileSize: config.upload.maxSize },
  // storage: multer.memoryStorage(),
}); // you can pass options here

module.exports = upload.single('file');
