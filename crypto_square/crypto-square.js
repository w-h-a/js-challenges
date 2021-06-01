"use strict";

module.exports.Crypto = Crypto;

function Crypto(text) {
  return {
    ciphertext: cipher(text)
  };

  function cipher(text) {
    return (function getLenFromCleanText(clean) {
      return (function getResult(len) {
        return Array.from(Array(len), mapperFunc).join(" ");

        function mapperFunc(_, col) {
          return getSegs().reduce(mapReducer(toTrans, strConcat), "");

          function getSegs() {
            return clean.match(new RegExp(`.{1,${len || 1}}`, "g"))?.reduce(mapReducer(padStr, listCombine), []);

            function padStr(str) {
              return str.padEnd(len);
            }
          }

          function toTrans(_, row, src) {
            return src[row][col];
          }
        }
      })(Math.ceil(Math.sqrt(clean.length)));
    })(text.toLowerCase().replace(/\W/g, ""));
  }
}

function mapReducer(mapper, combiner) {
  return reducer;

  function reducer(list, ele, idx, src) {
    return combiner(list, mapper(ele, idx, src), idx, src);
  }
}

function listCombine(list, ele) {
  list.push(ele);
  return list;
}

function strConcat(str1, str2) {
  return str1 + str2;
}
