const MongoClient = require('mongodb').MongoClient;
const Logger = require('../../logger')('./adapters/adapters.mongo.js');
const config = require('../config/config.mongo');

const { URI } = config;
const MongoAdapter = {
    connect,
    close,
    getState,
    wipeDB //excluir
};

const state = {
    db: null
};

function connect() {
    Logger.info(`Trying to connect at: ${URI}`);

    return new Promise((resolve, reject) => {
        if (state.db) {
            return resolve();
        }

        return MongoClient.connect(URI, (err, db) => {
            if (err) {
                Logger.error(`Fail to connect mongodb ${URI}. Error: ${err}`);
                return reject();
            }
            state.db = db;
            Logger.info('MongoDB connected successfully');
            return resolve();
        });
    });
}

function close() {
    if (state.db) {
        state.db.close((err) => {
            if (err) {
                Logger.error(`Error at close DB. Error: ${err}`);
            }
            state.db = null;
            Logger.info('DB closed successfully');
        });
    }
}

function wipeDB() {
    return new Promise((resolve, reject) => {
        if (state.db) {
            state.db.dropDatabase((err) => {
                if (err) {
                    Logger.error(`Fail to wipe mongodb. Error: ${err}`);
                    return reject();
                }
                return resolve();
            });
        }
    });
}

function getState() {
    return state.db;
}

module.exports = function factory() {
    return MongoAdapter;
};