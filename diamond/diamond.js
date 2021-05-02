"use strict";

module.exports.makeDiamond = rows;

var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function rows(letter) {
  var result = [];

  var location = alpha.indexOf(letter);
  let spaces = location;
  result.push(`${" ".repeat(spaces)}${alpha[0]}${" ".repeat(spaces)}`);
  spaces -= 1;

  if (letter === 'A') return result.join('');

  var middleSpaces = 1;
  for (let idx = 1; idx < location; idx += 1) {
    result.push(`${" ".repeat(spaces)}${alpha[idx]}${" ".repeat(middleSpaces)}${alpha[idx]}${" ".repeat(spaces)}`);
    spaces -= 1;
    middleSpaces += 2;
  }

  var middleRow = `${alpha[location]}${" ".repeat(middleSpaces)}${alpha[location]}`;

  result = [...result, middleRow, ...result.reverse()];

  return result.join('\n');
}
