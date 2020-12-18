function list(results) {
  const errors = [];
  results.forEach(r => (errors.push(formatError(r))));

  return {
    data: errors,
    error: false
  };
}

function formatError(error) {
  return {
    entity: error.entity,
    error_message: error.error,
    date: error.date
  };
}

module.exports = {
  list
};
