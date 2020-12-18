const tv4 = require('tv4');
const schema = require('./territories.schema');
const Territory = require('./territories.model');
const Logger = require('../../logger')('./territories/service.js');
const MongoAdapter = require('../adapters/adapters.mongo');
const ObjectID = require('mongodb').ObjectID;

const mongoAdapter = MongoAdapter();
const COLLECTION = 'territories';

const TerritoriesService = {
  create,
  get,
  getOne,
  remove,
  update
};

function create(payload) {
  return new Promise((resolve, reject) => {
    const valid = tv4.validate(payload, schema);
    const territory = Object.assign({}, payload);

    if (!valid) {
      return reject({ status: 400, error: 'incomplete-data.' });
    }

    if (!global.factory.territories.length) {
      return get({})
        .then(() => saveTerritory(territory)
          .then(resolve)
          .catch(reject)
        )
        .catch((err) => {
          Logger.error(`Error when trying to save territory. Error: ${err} %j`, err);
          return reject({ status: 500, error: 'Internal server error' });
        });
    }

    return saveTerritory(territory)
      .then(resolve)
      .catch(reject);
  });
}

function saveTerritory(territory) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);
    const territoryObj = new Territory(territory.name, territory.start, territory.end, null, territory.painted_area, territory.painted_squares);
    const territoryPayload = global.factory.createTerritory(territoryObj);

    if (territoryPayload) {
      delete territoryPayload.id;
      return Model.insert(territoryPayload)
        .then((doc) => {
          territoryPayload.id = doc.ops[0]._id;

          global.factory.updateTerritory(territoryPayload);

          return resolve(territoryPayload);
        })
        .catch((err) => {
          Logger.error(`Error when trying to save territory. Error: ${err} %j`, err);
          return reject({ status: 500, error: 'Error when trying to save territory.' });
        });
    }
    return reject({ status: 400, error: 'territory-overlay' });
  });
}

function get(query) {
  return new Promise((resolve, reject) => {
    if (global.factory.territories.length) {
      return resolve(global.factory.territories);
    }

    const Model = mongoAdapter.getState().collection(COLLECTION);

    return Model.find(query || {})
      .toArray((err, territories) => {
        if (err) {
          Logger.error(`Error when trying to get territory. Error: ${err} %j`, err);
          return reject({ status: 500, error: 'Error when trying to get territory.' });
        }
        territories.forEach(t => global.factory.createTerritory(new Territory(t.name, t.start, t.end, t._id, t.painted_area, t.painted_squares)));
        return resolve(global.factory.territories);
      });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);

    Model.remove({ _id: new ObjectID(id) })
      .then(() => {
        global.factory.removeTerritoryById(id);
        resolve();
      })
      .catch(() => reject());
  });
}

function getOne(id) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);

    Model.findOne({ _id: new ObjectID(id) })
      .then(result => resolve(result))
      .catch((err) => {
        Logger.error(`Error when trying to get one territory. Error: ${err} %j`, err);
        reject({ status: 500, error: 'Error when trying to get on territory.' });
      });
  });
}

function update(territory) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);
    const territoryObj = global.factory.updateTerritory(territory);

    Model.findOneAndUpdate({ _id: territory.id }, territoryObj, (err, result) => {
      if (err) {
        Logger.error(`Error when trying to update territory. Error: ${err} %j`, err);
        return reject({ status: 500, error: 'Error when trying to update territory.' });
      }

      return resolve(result.value);
    });
  });
}


module.exports = function factory() {
  return TerritoriesService;
};
