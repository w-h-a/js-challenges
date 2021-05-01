"use strict";

module.exports.octal = octal;

function octal(octalStr) {
  var publicInterface = {
    toDecimal
  };
  return publicInterface;

  function toDecimal() {
    if (octalStr.toLowerCase().match(/[-89a-z]/g)) return 0;
    let result = 0;
    for (let idx = 0, jdx = octalStr.length - 1; idx < octalStr.length; idx += 1, jdx -= 1) {
      result += Number(octalStr[idx]) * 8 ** jdx;
    }
    return result;
  }
}
