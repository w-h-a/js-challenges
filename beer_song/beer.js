"use strict";

Object.assign(module.exports, {
  verse,
  verses,
  lyrics
});

function verse(bottles) {
  if (bottles === 0) {
    return `No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n`;
  } else if (bottles === 1) {
    return `${bottles} bottle of beer on the wall, ${bottles} bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n`;
  } else if (bottles === 2) {
    return `${bottles} bottles of beer on the wall, ${bottles} bottles of beer.\nTake one down and pass it around, ${bottles - 1} bottle of beer on the wall.\n`;
  } else {
    return `${bottles} bottles of beer on the wall, ${bottles} bottles of beer.\nTake one down and pass it around, ${bottles - 1} bottles of beer on the wall.\n`;
  }
}

function verses(start, end) {
  var returnStr = "";
  while (start >= end) {
    returnStr += returnStr.length === 0 ? verse(start) : `\n` + verse(start);
    start -= 1;
  }
  return returnStr;
}

function lyrics() {
  return verses(99, 0);
}
