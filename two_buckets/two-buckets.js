"use strict";

module.exports.TwoBucket = TwoBucket;

function TwoBucket(buckOne, buckTwo, goal, starterBuck) {
  var first = { name: "one", capacity: buckOne, amount: 0 };
  var second = { name: "two", capacity: buckTwo, amount: 0 };
  var [ start, other ] = ifelser(oneIsStarter, firstFirst, secondFirst)();

  function oneIsStarter() {
    return starterBuck === "one";
  }

  function firstFirst() {
    return [first, second];
  }

  function secondFirst() {
    return [second, first];
  }

  return {
    get goalBucket() {
      return [start, other].find(amountIdenticalToGoal).name;
    },
    get otherBucket() {
      return [start, other].find(not(amountIdenticalToGoal)).amount;
    },
    moves
  };

  function amountIdenticalToGoal({ amount }) {
    return amount === goal;
  }

  function moves() {
    return ifelser(noSolution, throwNope, solve)();

    function noSolution() {
      return goal % gcd(start.amount, other.amount);

      function gcd(x, y) {
        return ifelser(yTruthy, gcd, reverseArgs(returnX))(y, x % y, x);

        function yTruthy(y) {
          return y;
        }

        function returnX(x) {
          return x;
        }
      }
    }

    function throwNope() {
      throw new Error("Not possible");
    }

    function solve() {
      return ifelser(done, returnZero, fillStart)();

      function done() {
        return [start, other].some(hasAmountIdenticalToGoal);

        function hasAmountIdenticalToGoal({ amount }) {
          return amount === goal;
        }
      }

      function returnZero() {
        return 0;
      }

      function fillStart() {
        return ifelser(starterAmountIsZero, setAmountToCapacity, fillOther)();

        function starterAmountIsZero() {
          return !start.amount;
        }

        function setAmountToCapacity() {
          start.amount = start.capacity;
          return 1 + solve();
        }

        function fillOther() {
          return ifelser(otherCapacityIdentityToGoal, setAmountToCapacity, emptyOtherIfFull)();

          function otherCapacityIdentityToGoal() {
            return other.capacity === goal;
          }

          function setAmountToCapacity() {
            other.amount = other.capacity;
            return 1 + solve();
          }

          function emptyOtherIfFull() {
            return ifelser(otherAmountIsIdenticalToCapacity, emptyOther, transfer)();

            function otherAmountIsIdenticalToCapacity() {
              return other.amount === other.capacity;
            }

            function emptyOther() {
              other.amount = 0;
              return 1 + solve();
            }

            function transfer(trans = Math.min(other.amount + start.amount, other.capacity) - other.amount) {
              start.amount -= trans;
              other.amount += trans;
              return 1 + solve();
            }
          }
        }
      }
    }
  }
}

function reverseArgs(func) {
  return argsReversed;

  function argsReversed(...args) {
    return func(...args.reverse());
  }
}

function ifelser(relation, func1, func2 = (...args) => undefined) {
  return ifelsed;

  function ifelsed(...args) {
    return relation(...args) ? func1(...args) : func2(...args);
  }
}

function not(relation) {
  return negated;

  function negated(...args) {
    return !relation(...args);
  }
}
