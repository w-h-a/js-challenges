"use strict";

module.exports.romanNumeral = romanNumeral;

function romanNumeral(num) {
  var romanToNum = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  var publicInterface = {
    toRoman
  };
  return publicInterface;

  function toRoman() {
    return Object.keys(romanToNum).reduce(function(acc, ele) {
      var quotient = Math.floor(num / romanToNum[ele]);
      num -= quotient * romanToNum[ele];
      acc += ele.repeat(quotient);
      return acc;
    }, "");
  }
}
