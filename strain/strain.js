"use strict";

Object.assign(module.exports, {
  keep,
  discard
});

function keep (list, condition) {
  if (!list.length) return [];
  return (
    condition (list[0]) ?
    [ list[0], ...keep (list.slice (1), condition) ]
    : keep (list.slice (1), condition)
  );
}

function discard (list, condition) {
  return keep (list, not (condition));
}

function not(condition) {
  return negated;

  function negated(...args) {
    return !condition(...args);
  }
}
