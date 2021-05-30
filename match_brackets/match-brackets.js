"use strict";

module.exports.isPaired = isPaired;

var bracketMapping = {
  '(': ')',
  '[': ']',
  '{': '}'
};

function isPaired(str, arr = (() => str.match(/[([{}\])]/g) || [])(), stack = []) {
  return arr.every(ifelser(isOpen, pushToStack, arePaired)) && stack.length === 0;

  function isOpen(ele) {
    return !!bracketMapping[ele];
  }

  function pushToStack(ele) {
    return stack.push(ele);
  }

  function arePaired(ele) {
    return bracketMapping[stack.pop()] === ele;
  }
}

function ifelser(relation, func1, func2 = (...args) => undefined) {
  return ifelsed;

  function ifelsed(...args) {
    return relation(...args) ? func1(...args) : func2(...args);
  }
}
