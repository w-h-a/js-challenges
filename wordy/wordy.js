"use strict";

module.exports.answer = answer;

function answer(str) {
  if (!str.match(/^What is/)) throw new Error('Unknown operation');
  if (!str.match(/^What is \-*[0-9]+/) || str.match(/^What is [0-9]+ [0-9]+/)) throw new Error('Syntax error');
  if (str.match(/^What is [0-9]+\?$/)) return Number(str.replace(/[^0-9]/g, ""));
  if (!str.match(/^What is \-*[0-9]+( plus| minus| multiplied by| divided by)+/)) throw new Error('Unknown operation');
  if (!str.match(/^What is \-*[0-9]+( plus| minus| multiplied by| divided by){1}\s*\-*[0-9]+( plus| minus| multiplied by| divided by){0,1}\s*\-*[0-9]*/)) throw new Error('Syntax error');
  if (str.match(/^What is \-*[0-9]+( plus| minus| multiplied by| divided by){1} \-*[0-9]+ \-*[0-9]+/)) throw new Error('Syntax error');

  var operationsArr = str.split(' ').filter(outOperations);
  var operandsArr = str.split(/[^0-9\-]+/).join(' ').trim().split(' ');

  var runningResult = Number(operandsArr[0]);
  for (let idx = 1; idx < operandsArr.length; idx += 1) {
    if (operationsArr[idx - 1] === "plus") {
      runningResult += Number(operandsArr[idx]);
    } else if (operationsArr[idx - 1] === "minus") {
      runningResult -= Number(operandsArr[idx]);
    } else if (operationsArr[idx - 1] === "multiplied") {
      runningResult *= Number(operandsArr[idx]);
    } else {
      runningResult /= Number(operandsArr[idx]);
    }
  }
  return runningResult;
}

function outOperations(ele, idx, arr) {
  return (ele === "plus" || ele === "minus" || ele === "multiplied" || ele === "divided");
}
