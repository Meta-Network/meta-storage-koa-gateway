const config = require('../../config').value;
const logger = require('../../logger');

const fs = require('fs');
const path = require('path');
const han = require('han');
const fleekStorage = require('@fleekhq/fleek-storage-js');
module.exports = {
  get(ctx) {
    // ctx.body = `Hello, fleek storage ${ctx.query.who ? 'for ' + ctx.query.who : ''
    // }`;
    // 设置头类型, 如果不设置，会直接下载该页面
    ctx.type = 'html';
    // 读取文件
    const pathUrl = path.join(__dirname, '../..', '/static/upload.html');
    ctx.body = fs.createReadStream(pathUrl);
  },
  async post(ctx) {
    // logger.log('ctx.request.files', ctx.request.files);
    logger.info('ctx.file', ctx.file);

    const userId = ctx.user && ctx.user.id ? ctx.user.id : 0;

    if (ctx.file) {
      const file = ctx.file;
      const filenameParsed = path.parse(file.originalname);
      const filename =
        han.letter(filenameParsed.name, '-') + filenameParsed.ext;

      const result = await fleekStorage.upload({
        apiKey: config.fleek.storage.api.key,
        apiSecret: config.fleek.storage.api.secret,
        key: `metanetwork/users/${userId}/${filename}`,
        data: fs.createReadStream(file.path),
      });

      ctx.body = {
        statusCode: 201,
        message: 'uploaded',
        data: result,
      };
    } else {
      ctx.throw(400, 'no files to upload');
    }
  },
};
