"use strict";

module.exports.hey = hey;

function hey(message) {
  if (message.toUpperCase() === message && message.match(/[A-Z]+\?$/)) {
    return "Calm down, I know what I'm doing!";
  } else if (message.toUpperCase() === message && message.match(/[A-Z]/g)) {
    return "Whoa, chill out!";
  } else if (message.trim().match(/.*\?$/)) {
    return "Sure.";
  } else if (message.trim().length !== 0) {
    return "Whatever.";
  } else {
    return "Fine. Be that way!";
  }
}
