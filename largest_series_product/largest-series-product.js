"use strict";

module.exports.largestProduct = largestProduct;

function largestProduct(digits, span) {
  if (digits.match(/[^0-9]/)) throw new Error('Digits input must only contain digits');
  if (span < 0) throw new Error('Span must be at least zero');
  if (digits.length < span) throw new Error('Span must be smaller than string length');
  var arrOfNums = digits.split('').map(toNums);
  var result = 0;
  for (let idx = span - 1; idx < arrOfNums.length; idx += 1) {
    let temp = 1;
    for (let jdx = idx; jdx > idx - span; jdx -= 1) {
      temp *= arrOfNums[jdx];
    }
    if (temp > result) {
      result = temp;
    }
  }
  return result;
}

function toNums(ele, idx, arr) {
  return Number(ele);
}
