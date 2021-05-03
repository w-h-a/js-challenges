"use strict";

module.exports.rows = rows;

function rows(num) {
  if (num === 0) return [];
  var result = [[1]];
  for (let idx = 1; idx < num; idx += 1) {
    let row = [];
    for (let jdx = 0; jdx < idx + 1; jdx += 1) {
      if (jdx === 0 || jdx === idx) {
        row.push(1);
      } else {
        row.push(result[idx - 1][jdx - 1] + result[idx - 1][jdx]);
      }
    }
    result.push(row);
  }
  return result;
}
