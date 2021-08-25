const { resolve } = require('path');
const config = require('./config').value;
const winston = require('winston');

const logger = winston.createLogger({
  level: config.logger.level,
  format: winston.format.json(),
  transports: transports,
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (!config.node.env === 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      silent: process.env.NODE_ENV === 'test',
    })
  );
}

module.exports = logger;
