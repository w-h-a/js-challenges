"use strict";

module.exports.List = List;

function List(arr = []) {
  var publicInterface = { compare, getArr };
  return publicInterface;

  function compare(otherList) {
    var thisStr = arr.join(' ');
    var otherStr = otherList.getArr().join(' ');
    if (thisStr.includes(otherStr) && otherStr.includes(thisStr) && otherStr.length === thisStr.length) {
      return "EQUAL";
    } else if ((thisStr.length === 0 && otherStr.length !== 0) || otherStr.includes(thisStr)) {
      return "SUBLIST";
    } else if ((otherList.length === 0 && thisStr.length !== 0) || thisStr.includes(otherStr)) {
      return "SUPERLIST";
    } else {
      return "UNEQUAL";
    }
  }
  function getArr() {
    return arr;
  }
}
