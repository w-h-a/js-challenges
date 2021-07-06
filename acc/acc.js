"use strict";

module.exports.acc = accumulate;

function accumulate (list, mapper) {
  if (!list.length) return [];
  return [ mapper (list[0]), ...accumulate (list.slice (1), mapper) ];
}
