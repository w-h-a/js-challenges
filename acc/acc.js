"use strict";

module.exports.acc = accumulate;

function accumulate(arr, callback) {
  var result = [];
  for (let idx = 0; idx < arr.length; idx += 1) {
    result.push(callback(arr[idx]));
  }
  return result;
}
