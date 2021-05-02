"use strict";

var namespace = {
  init: function(series) {
    var dataStructure = Object.create(namespace);
    dataStructure.series = series;
    return dataStructure;
  },
  slices: function(sliceLength) {
    this.check(sliceLength);
    var result = [];
    for (let idx = 0; idx < this.series.length - sliceLength + 1; idx += 1) {
      result.push(this.series.split('').map(this.toNums).slice(idx, idx + sliceLength));
    }
    return result;
  },
  check: function(sliceLength) {
    if (this.series.length === 0) {
      throw new Error("series cannot be empty");
    }
    if (this.series.length < sliceLength) {
      throw new Error("slice length cannot be greater than series length");
    }
    if (sliceLength === 0) {
      throw new Error("slice length cannot be zero");
    }
    if (sliceLength < 0) {
      throw new Error("slice length cannot be negative");
    }
  },
  toNums: function(ele) {
    return Number(ele);
  }
};

module.exports.init = namespace.init;

/*
class Series {
  constructor(series) {
    this.series = series;
  }

  slices(sliceLength) {
    this.check(sliceLength);
    var result = [];
    for (let idx = 0; idx < this.series.length - sliceLength + 1; idx += 1) {
      result.push(this.series.split('').map(this.toNums).slice(idx, idx + sliceLength));
    }
    return result;
  }

  check(sliceLength) {
    if (this.series.length === 0) {
      throw new Error("series cannot be empty");
    }
    if (this.series.length < sliceLength) {
      throw new Error("slice length cannot be greater than series length");
    }
    if (sliceLength === 0) {
      throw new Error("slice length cannot be zero");
    }
    if (sliceLength < 0) {
      throw new Error("slice length cannot be negative");
    }
  }

  toNums(ele) {
    return Number(ele);
  }
}
*/
