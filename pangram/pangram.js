"use strict";

module.exports.isPangram = isPangram;

var alpha = 'abcdefghijklmnopqrstuvwxyz';

function isPangram(str) {
  return alpha.split('').every(eleContainedIn, str.toLowerCase().split(''));
}

function eleContainedIn(ele) {
  return this.includes(ele);
}
