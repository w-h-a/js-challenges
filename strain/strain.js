"use strict";

Object.assign(module.exports, {
  keep,
  discard
});

function keep(arr, callback) {
  return arr.filter(callback)
}

function discard(arr, callback) {
  var result = [];
  for (let idx = 0; idx < arr.length; idx += 1) {
    if (!callback(arr[idx])) {
      result.push(arr[idx]);
    }
  }
  return result;
}
