const winston = require('winston');

// Configure winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.Console({ level: 'info' }) // Output logs to console as well
  ],
  exitOnError: false // Continue logging even if an error occurs
});

module.exports = logger;