function list(territories, withpainted) {
  const count = territories.length;
  const data = [];

  territories.forEach(t => data.push(formatTerritory(t, withpainted)));

  return { count, data };
}

function one(territory, withpainted) {
  return {
    data: formatTerritory(territory, withpainted),
    error: false
  };
}

function formatTerritory(territory, withpainted) {
  const returnObj = {
    id: territory.id || territory._id,
    name: territory.name,
    start: territory.start,
    end: territory.end,
    area: territory.area,
    painted_area: territory.painted_area || 0
  };

  if (withpainted === 'true') {
    returnObj.painted_squares = territory.painted_squares;
  }

  return returnObj;
}

module.exports = {
  list,
  one
};
