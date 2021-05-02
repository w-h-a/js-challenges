"use strict";

var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var nums = '0123456789'.split('');

var allPossibleNames = [];

for (let firstLetter of alpha) {
  for (let secondLetter of alpha) {
    for (let firstNum of nums) {
      for (let secondNum of nums) {
        for (let thirdNum of nums) {
          allPossibleNames.push(`${firstLetter}${secondLetter}${firstNum}${secondNum}${thirdNum}`);
        }
      }
    }
  }
}

var nameIndex = 0;

var Robot = {
  init: function() {
    var robo = Object.create(Robot);
    return robo;
  },
  name: function() {
    if (!this.id) {
      this.id = allPossibleNames[nameIndex];
      nameIndex += 1;
    }
    return this.id;
  },
  reset: function() {
    this.id = undefined;
  }
};

var init = Robot.init;

Object.assign(module.exports, {
  init
});
