"use strict";

module.exports.find = find;

function find(arr, value, lower = 0, upper = arr.length - 1) {
  return ifelser(upperLessThanLower, throwNope, reverseArgs(goAhead))(upper, lower, value, arr);
}

function upperLessThanLower(upper, lower) {
  return upper < lower;
}

function throwNope() {
  throw new Error('Value not in array');
}

function goAhead(arr, value, lower, upper) {
  return testEleAtMidGreaterThanValue(arr, value, lower, upper, Math.floor((lower + upper) / 2));
}

function testEleAtMidGreaterThanValue(arr, value, lower, upper, mid) {
  return ifelser(eleAtMidGreaterThanValue, midMinus, testEleAtMidLessThanValue)(arr, value, lower, upper, mid);
}

function eleAtMidGreaterThanValue(arr, value, lower, upper, mid) {
  return arr[mid] > value;
}

function midMinus(arr, value, lower, upper, mid) {
  return find(arr, value, lower, mid - 1);
}

function testEleAtMidLessThanValue(arr, value, lower, upper, mid) {
  return ifelser(eleAtMidLessThanValue, midPlus, reverseArgs(identity))(arr, value, lower, upper, mid);
}

function eleAtMidLessThanValue(arr, value, lower, upper, mid) {
  return arr[mid] < value;
}

function midPlus(arr, value, lower, upper, mid) {
  return find(arr, value, mid + 1, upper);
}

function identity(mid) {
  return mid;
}

function ifelser(relation, func1, func2 = (...args) => undefined) {
  return ifelsed;

  function ifelsed(...args) {
    return relation(...args) ? func1(...args) : func2(...args);
  }
}

function reverseArgs(func) {
  return argsReversed;

  function argsReversed(...args) {
    return func(...args.reverse());
  }
}
