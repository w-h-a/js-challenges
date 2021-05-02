"use strict";

var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var nums = '0123456789';

var Robot = {
  init: function() {
    var robo = Object.create(Robot);
    return robo;
  },
  reset: function() {
    this.id = `${alpha[getRandomIdx(0, alpha.length - 1)]}${alpha[getRandomIdx(0, alpha.length - 1)]}${nums[getRandomIdx(0, nums.length - 1)]}${nums[getRandomIdx(0, nums.length - 1)]}${nums[getRandomIdx(0, nums.length - 1)]}`;
  },
  name: function() {
    if (this.hasOwnProperty("id")) {
      return this.id;
    } else {
      this.reset();
      return this.id;
    }
  }
};

function getRandomIdx(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

var init = Robot.init;

Object.assign(module.exports, {
  init
});
