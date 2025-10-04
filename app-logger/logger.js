const winston = require('winston');
const FluentTransport = require('./fluent-transport');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: []
});

if (process.env.PUSH_LOGS_TO_FLUENT === 'true') {
  logger.add(new FluentTransport({
    tag: process.env.FLUENT_TAG || 'gps.api'
  }));
}

module.exports = logger;
