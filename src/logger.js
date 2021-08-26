const config = require('./config').value;
const winston = require('winston');

const logger = winston.createLogger({
  level: config.logger.level,
  format: winston.format.json(),
  transports: [],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.node.env !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      silent: config.node.env === 'test',
    }),
  );
}

module.exports = logger;
