"use strict";

module.exports.Cipher = Cipher;

function Cipher(key) {
  var alphaToIdx = {
    a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9,
    k: 10, l: 11, m: 12, n: 13, o: 14, p: 15, q: 16, r: 17, s: 18, t: 19,
    u: 20, v: 21, w: 22, x: 23, y: 24, z: 25
  };
  var square = [
    'abcdefghijklmnopqrstuvwxyz'.split(''),
    'bcdefghijklmnopqrstuvwxyza'.split(''),
    'cdefghijklmnopqrstuvwxyzab'.split(''),
    'defghijklmnopqrstuvwxyzabc'.split(''),
    'efghijklmnopqrstuvwxyzabcd'.split(''),
    'fghijklmnopqrstuvwxyzabcde'.split(''),
    'ghijklmnopqrstuvwxyzabcdef'.split(''),
    'hijklmnopqrstuvwxyzabcdefg'.split(''),
    'ijklmnopqrstuvwxyzabcdefgh'.split(''),
    'jklmnopqrstuvwxyzabcdefghi'.split(''),
    'klmnopqrstuvwxyzabcdefghij'.split(''),
    'lmnopqrstuvwxyzabcdefghijk'.split(''),
    'mnopqrstuvwxyzabcdefghijkl'.split(''),
    'nopqrstuvwxyzabcdefghijklm'.split(''),
    'opqrstuvwxyzabcdefghijklmn'.split(''),
    'pqrstuvwxyzabcdefghijklmno'.split(''),
    'qrstuvwxyzabcdefghijklmnop'.split(''),
    'rstuvwxyzabcdefghijklmnopq'.split(''),
    'stuvwxyzabcdefghijklmnopqr'.split(''),
    'tuvwxyzabcdefghijklmnopqrs'.split(''),
    'uvwxyzabcdefghijklmnopqrst'.split(''),
    'vwxyzabcdefghijklmnopqrstu'.split(''),
    'wxyzabcdefghijklmnopqrstuv'.split(''),
    'xyzabcdefghijklmnopqrstuvw'.split(''),
    'yzabcdefghijklmnopqrstuvwx'.split(''),
    'zabcdefghijklmnopqrstuvwxy'.split('')
  ];
  key = key ? key : getRandomKey();
  var publicAPI = {
    get key() {
      return key;
    },
    encode,
    decode
  }
  return publicAPI;

  function encode(message) {
    return message.split('').map(toEncryptedChar).join('');
  }

  function decode(encryptedMessage) {
    return encryptedMessage.split('').map(toDecryptedChar).join('');
  }

  function toEncryptedChar(ele, idx, arr) {
    var row = alphaToIdx[key[idx % key.length]];
    var column = alphaToIdx[arr[idx]]
    return square[row][column];
  }

  function toDecryptedChar(ele, idx, arr) {
    var row = alphaToIdx[key[idx % key.length]];
    var index = square[row].indexOf(ele);
    return square[0][index];
  }

  function getRandomKey() {
    var result = "";
    for (let idx = 0; idx < 100; idx += 1) {
      result += square[0][getRandomIdxFromInterval(0, 25)];
    }
    return result;
  }

  function getRandomIdxFromInterval(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }
}
