const Schema = {
  title: 'territory',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    start: {
      type: 'object'
    },
    end: {
      type: 'object'
    }
  },
  required: ['name', 'start', 'end']
};

module.exports = Schema;
