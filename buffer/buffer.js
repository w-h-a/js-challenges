"use strict";

var circularQ = Object.create(Array.prototype);

circularQ.init = function(max) {
  var dataStructure = Object.create(circularQ);
  dataStructure.max = max;
  return dataStructure;
};

circularQ.forceWrite = function(strNum) {
  if (this.length === this.max) {
    this.read();
  }
  this.write(strNum);
};

circularQ.read = function() {
  if (this.length > 0) {
    return this.shift();
  } else {
    throw new Error("Buffer is empty");
  }
};

circularQ.write = function(strNum) {
  if (this.length === this.max) {
    throw new Error("Buffer is full");
  }
  if (!(strNum === undefined || strNum === null)) {
    this.push(strNum);
  }  
};

circularQ.clear = function() {
  var size = this.length;
  for (let idx = 0; idx < size; idx += 1) {
    this.read();
  }
};

var CircularBuffer = circularQ.init;

Object.assign(module.exports, {
  CircularBuffer
});
