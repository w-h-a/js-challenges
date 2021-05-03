"use strict";

module.exports.Clock = Clock;

// Module-Based Solution

function Clock(hour, min = 0) {
  var toAdd = Math.floor(min / 60);
  hour += toAdd;
  hour = hour % 24 < 0 ? 24 + hour % 24 : hour % 24;
  min = min % 60 < 0 ? 60 + min % 60 : min % 60;

  var publicInterface = {
    toString,
    add,
    subtract,
    isEqual,
    getHour,
    getMin
  };
  return publicInterface;

  function toString() {
    var hourStr = hour.toString().length === 1 ? `0${hour}:` : `${hour}:`;
    var minStr = min.toString().length === 1 ? `0${min}` : `${min}`;
    return hourStr + minStr;
  }

  function add(minsToAdd) {
    return Clock(hour, min + minsToAdd);
  }

  function subtract(minsToSubtract) {
    return Clock(hour, min - minsToSubtract);
  }

  function isEqual(clockToCompare) {
    return hour === clockToCompare.getHour() && min === clockToCompare.getMin();
  }

  function getHour() {
    return hour;
  }

  function getMin() {
    return min;
  }
}

Clock.at = function(hour, min) {
  return Clock(hour, min);
};

/* Class-Based Solution

class Clock {
  constructor(hour, min = 0) {
    var toAdd = Math.floor(min / 60);
    hour += toAdd;
    this.hour = hour % 24 < 0 ? 24 + hour % 24 : hour % 24;
    this.min = min % 60 < 0 ? 60 + min % 60 : min % 60;
  }

  toString() {
    var hourStr = this.hour.toString().length === 1 ? `0${this.hour}:` : `${this.hour}:`;
    var minStr = this.min.toString().length === 1 ? `0${this.min}` : `${this.min}`;
    return hourStr + minStr;
  }

  add(minsToAdd) {
    return new Clock(this.hour, this.min + minsToAdd);
  }

  subtract(minsToSubtract) {
    return new Clock(this.hour, this.min - minsToSubtract);
  }

  isEqual(clockToCompare) {
    return this.hour === clockToCompare.hour && this.min === clockToCompare.min;
  }

  static at(hour, min) {
    return new Clock(hour, min);
  }
}

*/
