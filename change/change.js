"use strict";

module.exports.Change = Change;

function Change() {
  return {
    calculate
  };

  function calculate(coins, target) {
    return ifelser(targetLessThanZero, throwNoNegativesError, checkIfTargetZero)(coins, target);

    function targetLessThanZero(_, target) {
      return target < 0;
    }

    function throwNoNegativesError() {
      throw new Error("Negative totals are not allowed.");
    }

    function checkIfTargetZero(coins, target) {
      return ifelser(targetZero, returnArrLenZero, getResult)(coins, target);

      function targetZero(_, target) {
        return target === 0;
      }

      function returnArrLenZero() {
        return [];
      }

      function getResult(coins, target) {
        var memoizedGetChange = memoize(getChange);
        return ifelser(resultIsNull, throwSorryError, identity)(memoizedGetChange(target));

        function resultIsNull(result) {
          return result === null;
        }

        function throwSorryError() {
          throw new Error(`The total ${target} cannot be represented in the given currency.`);
        }

        function getChange(remain) {
          return coins.reduceRight(accChangeReducer, null);

          function accChangeReducer(change, coin) {
            return ifelser(remainIdenticalToCoin, returnCoin, checkIfRemainGreaterThanCoin)(change, coin);

            function remainIdenticalToCoin(_, coin) {
              return remain === coin;
            }

            function returnCoin(_, coin) {
              return [coin];
            }

            function checkIfRemainGreaterThanCoin(change, coin) {
              return ifelser(remainGreaterThanCoin, keepGoing, identity)(change, coin);

              function remainGreaterThanCoin(_, coin) {
                return remain > coin;
              }

              function keepGoing(change, coin, cached = memoizedGetChange(remain - coin)) {
                return ifelser(cachedNumOfCoinsPlusOneIsLessThanCurrNumOfCoins, resetResult, identity)(change, coin, cached);

                function cachedNumOfCoinsPlusOneIsLessThanCurrNumOfCoins(change, _, cached) {
                  return cached && (change?.length ?? Infinity) > cached.length + 1;
                }

                function resetResult(_, coin, cached) {
                  return cached.concat(coin)
                }
              }
            }
          }
        }
      }
    }
  }
}

function ifelser(relation, func1, func2 = (...args) => undefined) {
  return ifelsed;

  function ifelsed(...args) {
    return relation(...args) ? func1(...args) : func2(...args);
  }
}

function memoize(func, cache = {}) {
  return memoized;

  function memoized(...args) {
    return cache[args] ? cache[args] : updateCache(args, cache, func(...args))[args];
  }
}

function updateCache(name, obj, val) {
  obj[name] = val;
  return obj;
}

function identity(result) {
  return result;
}
