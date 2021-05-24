"use strict";

module.exports.isValid = isValid;

function isValid(i) {
  if (i[i.length - 1] === "X") {
    i = i.replace(/[^0-9]/g, "");
    i = i.split("");
    i.push("10");
  } else {
    i = i.replace(/[^0-9]/g, "");
    i = i.split("");
  }
  i = i.map(toNums);
  if (i.length !== 10) return false;
  return (i[0] * 10 + i[1] * 9 + i[2] * 8 + i[3] * 7 + i[4] * 6 + i[5] * 5 + i[6] * 4 + i[7] * 3 + i[8] * 2 + i[9] * 1) % 11 === 0;
}

function toNums(ele, idx, src) {
  return Number(ele);
}
