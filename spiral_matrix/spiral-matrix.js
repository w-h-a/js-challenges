"use strict";

module.exports.SpiralMatrix = (function SpiralMatrix() {
  var publicAPI = {
    ofSize
  };
  return publicAPI;

  function ofSize(num) {
    if (num === 0) return [];
    return (function spiral(rows, cols, init) {
      return rows ? [range(init, (init + cols) - 1)].concat(transpose(spiral(cols, rows - 1, init + cols)).map(toReverse)) : [[]];
    })(num, num, 1);
  }

  function range(init, final) {
    var contextObj = { init };
    return Array.apply(null, Array(final - init + 1)).map(toNums, contextObj);
  }

  function toNums(ele, idx, src) {
    return this.init + idx;
  }

  function transpose(lst) {
    return lst.length > 1 ? lst[0].map(toTrans, lst) : lst;
  }

  function toTrans(_, idx, src) {
    var contextObj = { idx };
    return this.map(toCorresponding, contextObj);
  }

  function toCorresponding(arr, _, src) {
    return arr[this.idx];
  }

  function toReverse(lst) {
    return lst.length > 1 ? lst.reduceRight(toConcat, []) : lst;
  }

  function toConcat(acc, ele, idx, src) {
    return acc.concat(ele);
  }
})()
