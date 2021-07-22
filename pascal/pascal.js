"use strict";

const rows = num => {
  return (function keepGoing (count) {
    return num => {
      if (count === num) return [];
      const getRow = count => prev => k => count === 0 ? [] : [ prev, ...getRow (count - 1) (prev * ((count - 1) / (k + 1))) (k + 1) ];
      return [ [1, ...getRow (count) (1 * (count / 1)) (1)], ...keepGoing (count + 1) (num) ];
    }
  }) (0) (num);
};

module.exports.rows = rows;
