"use strict";

module.exports.sumOfMultiples = sumOfMultiples;

function sumOfMultiples(...arrOfNums) {
  arrOfNums = arrOfNums.length === 0 ? [3, 5] : arrOfNums;
  var publicInterface = {
    to
  };
  return publicInterface;

  function to(limit) {
    arrOfNums.sort(inAscendingOrder);
    var result = 0;
    for (let potentialMultiple = arrOfNums[0]; potentialMultiple < limit; potentialMultiple += 1) {
      const contextObj = { potentialMultiple };
      if (arrOfNums.some(multiple, contextObj)) {
        result += potentialMultiple;
      }
    }
    return result;
  }

  function inAscendingOrder(x, y) {
    return x - y;
  }

  function multiple(num) {
    return this.potentialMultiple % num === 0;
  }
}

sumOfMultiples.to = function(limit) {
  return sumOfMultiples().to(limit);
};
