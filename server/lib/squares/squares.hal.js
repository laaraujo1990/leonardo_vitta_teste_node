function one(x, y, result) {
  const { painted } = result;

  return {
    data: formatSquare(x, y, painted),
    error: false
  };
}

function list(results) {
  const squaresArr = [];
  results.forEach(r => (squaresArr.push(formatSquare(r.x, r.y, true, r.date))));

  return {
    data: squaresArr,
    error: false
  };
}

function formatSquare(x, y, painted, date) {
  return {
    x,
    y,
    painted: painted ? true : false,
    date
  };
}

module.exports = {
  one,
  list
};
