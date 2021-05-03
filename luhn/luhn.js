"use strict";

module.exports.Luhn = Luhn;

function Luhn(num) {
  var publicAPI = { valid };
  return publicAPI;

  function valid() {
    num = num.replace(/ /g, "");
    if (num.match(/[^0-9]/g) || num.length < 2) return false;
    return num.split('').map(toNums).reverse().map(toDoubledEverySecond).reduce(toSum, 0) % 10 === 0;
  }
  function toNums(ele) {
    return Number(ele);
  }
  function toDoubledEverySecond(ele, idx) {
    return idx % 2 !== 0 ? ele * 2 > 9 ? (ele * 2) - 9 : ele * 2 : ele;
  }
  function toSum(acc, ele) {
    acc += ele;
    return acc;
  }
}
