const exportConfig = require('export-config');

const config = {
    default: {
        PORT: 8888
    },
    development: {
        PORT: 8888
    },
    staging: {
        PORT: 8888
    },
    production: {
        PORT: 8888
    },
    required: ['PORT']
};

module.exports = exportConfig(config);