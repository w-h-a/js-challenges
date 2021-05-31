"use strct";

module.exports.transpose = transpose;

function transpose(arrOfStrs) {
  return Array.from(Array(getMaxLen(arrOfStrs)), mappingFunction);

  function getMaxLen(arrOfStrs) {
    return arrOfStrs.reduce(findMaxReducer, 0);

    function findMaxReducer(acc, { length }) {
      return Math.max(acc, length);
    }
  }

  function mappingFunction(_, idx) {
    return arrOfStrs.reduce(mapReducer(toCorrectStr, strConcat), "");

    function toCorrectStr(acc, ele, jdx) {
      return ifelser(charAtIdxIsTruthy, charWithPadding, strOfLenZero)(acc, ele, jdx);

      function charAtIdxIsTruthy(_, ele) {
        return ele[idx];
      }

      function charWithPadding(acc, ele, jdx) {
        var result = ele[idx].padStart(jdx - acc.length + 1);
        return result;
      }

      function strOfLenZero() {
        return "";
      }
    }

    function strConcat(str1, str2) {
      return str1 + str2;
    }
  }
}

function mapReducer(mapper, combiner) {
  return reducer;

  function reducer(list, ele, idx, src) {
    return combiner(list, mapper(list, ele, idx), idx, src);
  }
}

function ifelser(relation, func1, func2 = (...args) => undefined) {
  return ifelsed;

  function ifelsed(...args) {
    return relation(...args) ? func1(...args) : func2(...args);
  }
}
