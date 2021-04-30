module.exports.triangle = triangle;

function isTriangle(sortedSides) {
  var criterion1 = (sortedSides[0] + sortedSides[1]) >= sortedSides[2];
  var criterion2 = sortedSides.every(function(ele) {
    return ele > 0;
  });
  if (!(criterion1 && criterion2)) {
    throw new Error("snot a triangle!");
  }
}

function triangle(...sides) {
  var sortedSides = sides.sort(function(x, y) {
    return x - y;
  });
  isTriangle(sortedSides);
  var publicInterface = {
    kind
  };
  return publicInterface;

  function kind() {
    if (isDegenerate()) return "(at least) degenerate";
    if (isEquilateral()) return "equilateral (and isosceles)";
    if (isIsosceles()) return "isosceles";
    return "scalene";
  }
  function isDegenerate() {
    return (sortedSides[0] + sortedSides[1]) === sortedSides[2];
  }
  function isEquilateral() {
    return sortedSides.every(function(ele) {
      return sortedSides[0] === ele;
    });
  }
  function isIsosceles() {
    return (sortedSides[0] === sortedSides[1]) || (sortedSides[1] === sortedSides[2]);
  }
}
