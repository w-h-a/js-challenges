"use strict";

module.exports.primes = primes;

function primes(integer) {
  var arr = [];
  arr.length = integer + 1;
  arr.fill(true, 2);
  for (let idx = 2; idx < Math.ceil(Math.sqrt(integer)); idx += 1) {
    for (let jdx = idx ** 2, inc = 1; jdx < integer + 1; jdx = (idx ** 2) + (idx * inc), inc += 1) {
      arr[jdx] = false;
    }
  }
  return arr.map(toTrueIdx).filter(outFalse);
}

function toTrueIdx(ele, idx) {
  return ele ? idx : ele;
}

function outFalse(ele) {
  return ele;
}
