"use strict";

module.exports.LinkedList = LinkedList;

function LinkedList() {
  var data = [];
  var publicInterface = {
    push,
    pop,
    shift,
    unshift,
    count,
    deleteIt
  };
  return publicInterface;

  function push(num) {
    data.push(num);
  }

  function pop() {
    return data.pop();
  }

  function shift() {
    return data.shift();
  }

  function unshift(num) {
    data.unshift(num);
  }

  function count() {
    return data.length;
  }

  function deleteIt(num) {
    if (data.indexOf(num) === -1) return null;
    data.splice(data.indexOf(num), 1);
  }
}
