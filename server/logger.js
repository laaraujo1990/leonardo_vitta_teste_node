const Winston = require('winston');
const moment = require('moment');

Winston.emitErrs = true;

const winston = new Winston.Logger({
    transports: [
        new Winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            prettyPrint: true,
            colorize: true,
            timestamp: () => moment().format('DD/MM/YYYY, h:mm:ss a'),
            humanReadableUnhandledException: true
        })
    ],
    exitOnError: false
});

module.exports = function factory(fileName) {
    return {
        info(msg, vars) {
            winston.info(`[backend-challenge] => [${fileName || ' '}] => ${msg}`, vars);
        },
        error(msg, vars) {
            winston.error(`[backend-challenge] => [${fileName || ' '}] => ${msg}`, vars);
        }
    };
};