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

shuffle(allPossibleNames);

function getRandomIdx(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function shuffle(arr) {
  for (let idx = 0; idx < arr.length; idx += 1) {
    const jdx = getRandomIdx(0, arr.length - 1);
    [ arr[jdx], arr[idx] ] = [arr[idx], arr[jdx]];
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
    this.id = null;
  }
};

Robot.releaseNames = function() {
  nameIndex = 0;
}

var init = Robot.init;

init.releaseNames = Robot.releaseNames;

Object.assign(module.exports, {
  init
});
