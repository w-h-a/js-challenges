"use strict";

module.exports.saddlePoints = saddlePoints;

function saddlePoints(matrix) {
  var result = [];
  for (let idx = 0; idx < matrix.length; idx += 1) {
    for (let jdx = 0; jdx < matrix[idx].length; jdx += 1) {
      const thisValue = { x: matrix[idx][jdx] };
      if (matrix[idx].every(eleGreaterOrEqualTo, thisValue)) {
        const thisColumn = [];
        for (let kdx = 0; kdx < matrix.length; kdx += 1) {
          thisColumn.push(matrix[kdx][jdx]);
        }
        if (thisColumn.every(eleLessOrEqualTo, thisValue)) {
          result.push({ row: idx + 1, column: jdx + 1 })
        }
      }
    }
  }
  return result;
}

function eleGreaterOrEqualTo(ele) {
  return this.x >= ele;
}

function eleLessOrEqualTo(ele) {
  return this.x <= ele;
}
