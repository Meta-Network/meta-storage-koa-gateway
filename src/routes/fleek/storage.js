const config = require('../../config').value;
const logger = require('../../logger');

const fs = require('fs');
const path = require('path');
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
    logger.info('ctx.files', ctx.files);


    if (ctx.files && ctx.files.length > 0) {
      const results = await Promise.all(ctx.files.map(async (file) =>
        await fleekStorage.upload({
          apiKey: config.fleek.storage.api.key,
          apiSecret: config.fleek.storage.api.secret,
          key: `metaspace/${file.originalname}`,
          data: fs.createReadStream(file.path),
        })
      ));
      ctx.body = {
        statusCode: 201,
        message: 'uploaded',
        data: results,
      };
    }
    else {
      ctx.throw(400, 'no files to upload');
    }


  },
};
