function InvalidArea(message) {
    this.message = (message || 'Invalid area');
}

function InvalidTerritory(message) {
    this.message = (message || 'Invalid territory');
}

InvalidArea.prototype = Error.prototype;
InvalidTerritory.prototype = Error.prototype;

module.exports = {
    InvalidTerritory,
    InvalidArea
};