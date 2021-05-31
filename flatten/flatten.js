"use strict";

var reduce = methodToFunction("reduce", 3);
var curriedFilterReducer = curry(filterReducer, 2);
var curriedMapReducer = curry(mapReducer, 2);

module.exports.flatten = flatten;

function flatten(arr, depth = Infinity) {
  var flattenAndRemoveUndefinedNull = compose(curriedMapReducer(flat), curriedFilterReducer(noUndefinedNull));
  return transduce(arr, flattenAndRemoveUndefinedNull, [], flatCombine);

  function flat(ele) {
    return ifelser(depthGreaterThanZero, keepFlattening, returnEle)(ele);

    function depthGreaterThanZero() {
      return depth > 0;
    }

    function keepFlattening(ele) {
      return ifelser(depthGreaterThanOneAndEleIsArray, flatten, identity)(ele, depth - 1);

      function depthGreaterThanOneAndEleIsArray(ele) {
        return depth > 1 && Array.isArray(ele);
      }

      function identity(ele) {
        return ele;
      }
    }

    function returnEle(ele) {
      return [ele];
    }
  }

  function noUndefinedNull(ele) {
    return ele !== null && ele !== undefined;
  }

  function flatCombine(list, ele) {
    return list.concat(ele);
  }
}

function curry(func, arity = 1) {
  return (function nextCurried(prevArgs) {
    return curried;

    function curried(...nextArg) {
      var args = [...prevArgs, ...nextArg];
      return args.length >= arity ? func(...args) : nextCurried(args);
    }
  })([]);
}

function compose(...funcs) {
  var [ fn1, fn2, ...rest ] = funcs.reverse();

  return rest.length === 0 ? composed : compose(...rest.reverse(), composed);

  function composed(...args) {
    return fn2(fn1(...args));
  }
}

function ifelser(relation, func1, func2 = (...args) => undefined) {
  return ifelsed;

  function ifelsed(...args) {
    return relation(...args) ? func1(...args) : func2(...args);
  }
}

function methodToFunction(methodName, argCount = 3) {
  return curry(getMethod, argCount);

  function getMethod(...args) {
    var obj = args.shift();
    return obj[methodName](...args);
  }
}

function filterReducer(relation, combiner) {
  return reducer;

  function reducer(list, ele, idx, src) {
    return relation(ele, idx, src) ? combiner(list, ele, idx, src) : list;
  }
}

function mapReducer(mapper, combiner) {
  return reducer;

  function reducer(list, ele, idx, src) {
    return combiner(list, mapper(ele), idx, src);
  }
}

function transduce(arr, transducer, init, combiner) {
  var reducer = transducer(combiner);
  return reduce(arr, reducer, init);
}
