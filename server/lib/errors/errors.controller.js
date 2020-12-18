const Service = require('./errors.service');
const hal = require('./errors.hal');

const eService = Service();
const DEFAULT_ERROR_MESSAGE = 'Server error';
const DEFAULT_STATUS_ERROR = 500;

const ErrorsController = {
  get
};

function get(req, res) {
  eService.get({})
    .then((result) => {
      if (!result.length) {
        return res.status(404).send({ error: 'not-found' });
      }
      return res.status(200).send(hal.list(result));
    })
    .catch(err => res.status(err.status || DEFAULT_STATUS_ERROR).send({ error: err.error || DEFAULT_ERROR_MESSAGE }));
}

module.exports = function factory() {
  return ErrorsController;
};
