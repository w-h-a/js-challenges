"use strict";

// incomplete

function throwError (amount) {
  throw new Error (`The total ${amount} cannot be represented in the given currency.`);
}

function calculate (coinvals, amount) {
  if (amount < 0) throw new Error ('Negative totals are not allowed.');
  var result = (function allChange (coinvals, amount, coins = []) {
    if (amount === 0) return [ coins ];
    if (!coinvals.length) return [];
    return (([ c, ...coinvals ], amount, coins) => {
      return (
        amount < 0 ?
        []
        : [
          ...allChange ([ c, ...coinvals ], amount - c, [ c, ...coins ]),
          ...allChange (coinvals, amount, coins)
        ]
      );
    }) (coinvals.sort ((x, y) => y - x), amount, coins);
  }) (coinvals, amount).sort ((x, y) => x.length - y.length)[0];
  return !result ? throwError (amount) : result;
}

function Change () {
  return {
    calculate
  };
}

module.exports.Change = Change;
