const exportConfig = require('export-config');

const config = {
    default: {
        URI: 'mongodb://localhost:27017/vitta-challenge'
    },
    development: {
        URI: 'mongodb://localhost:27017/vitta-challenge'
    },
    production: {
        URI: 'mongodb://mongo:27017/vitta-challenge'
    },
    test: {
        URI: 'mongodb://localhost:27017/vitta-challenge-test'
    },
    required: ['URI']
};

module.exports = exportConfig(config);