"use strict";

module.exports.primeFactors = primeFactors;

function primeFactors(num) {
  var result = [];
  while (num % 2 === 0) {
    result.push(2);
    num = Math.floor(num / 2);
  }
  for (let idx = 3; idx < Math.floor(Math.sqrt(num)) + 1; idx += 2) {
    while (num % idx === 0) {
      result.push(idx)
      num = Math.floor(num / idx);
    }
  }
  if (num > 2) {
    result.push(num);
  }
  return result;
}
