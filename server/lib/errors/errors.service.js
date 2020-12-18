const MongoAdapter = require('../adapters/adapters.mongo');

const mongoAdapter = MongoAdapter();
const COLLECTION = 'errors';

const ErrosService = {
  save,
  get
};

function save(error) {
  const Model = mongoAdapter.getState().collection(COLLECTION);
  const payload = Object.assign({}, error);

  payload.date = new Date();

  Model.insert(payload);
}

function get(query) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);

    Model.find(query)
      .toArray((err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
  });
}

module.exports = function factory() {
  return ErrosService;
};
