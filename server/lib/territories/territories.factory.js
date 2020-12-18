const Territory = require('./territories.model');

function Factory() {
  this.territories = [];
}

Factory.prototype.createTerritory = createTerritory;
Factory.prototype.updateTerritory = updateTerritory;
Factory.prototype.removeTerritoryById = removeTerritoryById;

function createTerritory(territory) {
  const isValid = this.territories.length ? validateTerritories(this.territories, territory) : true;

  if (!isValid) {
    return null;
  }
  this.territories.push(territory);
  return territory;
}

function validateTerritories(territories, t2) {
  const t2Squares = t2.calculateSquares();
  let isValid = true;

  territories.every((t) => {
    const t1Squares = new Territory(t.name, t.start, t.end).calculateSquares();
    if (!isValidTerritory(t1Squares, t2Squares)) {
      isValid = false;
      return false;
    }
    return true;
  });

  return isValid;
}

function updateTerritory(territory) {
  let i = -1;
  this.territories.every((t, index) => {
    if (t.id === territory.id) {
      i = index;
      return false;
    }
    return true;
  });

  if (i >= 0) {
    this.territories[i] = territory;
    this.territories[i].painted_area = territory.painted_squares.length;

    return territory;
  }

  return null;
}

function removeTerritoryById(id) {
  this.territories = this.territories.filter(t => t.id.toString() !== id.toString());
}

function isValidTerritory(squares1, squares2) {
  return !squares1.find(el => squares2.find(yEl => (yEl.x === el.x) && (yEl.y === el.y)));
}

module.exports = Factory;
