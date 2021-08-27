const app = require('./app');
const config = require('./config').value;
const logger = require('./logger');

logger.info(`Server listening on port: ${config.app.port}`);
app.listen(config.app.port);
