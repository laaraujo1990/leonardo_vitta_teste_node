function Territory(name, start, end, id, paintedArea, paintedSquares) {
  this.id = id;
  this.name = name || '';
  this.start = start || {};
  this.end = end || {};
  this.painted_area = paintedArea || 0;
  this.painted_squares = paintedSquares || [];
  this.area = this.calculateArea();
}

Territory.prototype.calculateArea = calculateArea;
Territory.prototype.calculateSquares = calculateSquares;

function calculateArea() {
  if ((this.end.x && this.end.y) && (this.end.x && this.end.y)) {
    const x = this.end.x - this.start.x;
    const y = this.end.y - this.start.y;

    return x * y;
  }
  return 0;
}

function calculateSquares() {
  const squares = [];

  for (let i = this.start.x; i <= this.end.x; i++) {
    for (let j = this.start.y; j <= this.end.y; j++) {
      squares.push({ x: i, y: j });
    }
  }

  return squares;
}

module.exports = Territory;
