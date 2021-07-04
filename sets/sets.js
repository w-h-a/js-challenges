"use strict";

class CustomSet {
  static setType () {
    return Object.create (CustomSet.prototype);
  }

  static Set ([ x, ...xs ]) {
    let set = CustomSet.setType ();
    set.elements = x === undefined ? [] : CustomSet.newMem (x, CustomSet.Set (xs)).elements;
    return set;
  }

  static newMem (val, set) {
    return CustomSet.member (val, set) ? set : (() => {
      set.elements = [val, ...set.elements];
      return set;
    }) ();
  }

  static member (val, set) {
    return set.elements.includes (val);
  }

  static empty ({ elements }) {
    return elements.length === 0;
  }

  static union (xs, ys) {
    if (!xs.elements.length && !ys.elements.length) return CustomSet.Set ([]);
    if (!xs.elements.length) return ys;
    if (!ys.elements.length) return xs;
    return CustomSet.newMem (xs.elements[0], CustomSet.union (CustomSet.Set (xs.elements.slice (1)), ys));
  }

  static intersection (xs, ys) {
    if (!xs.elements.length || !ys.elements.length) return CustomSet.Set ([]);
    return (
      CustomSet.member (xs.elements[0], ys) ?
      CustomSet.Set ([ xs.elements[0], ...CustomSet.intersection (CustomSet.Set (xs.elements.slice (1)), ys).elements ])
      : CustomSet.Set ([ ...CustomSet.intersection (CustomSet.Set (xs.elements.slice (1)), ys).elements ])
    );
  }

  static difference (xs, ys) {
    if (!xs.elements.length || !ys.elements.length) return xs;
    return (
      !CustomSet.member (xs.elements[0], ys) ?
      CustomSet.Set ([ xs.elements[0], ...CustomSet.difference (CustomSet.Set (xs.elements.slice (1)), ys).elements ])
      : CustomSet.Set ([ ...CustomSet.difference (CustomSet.Set (xs.elements.slice (1)), ys).elements ])
    );
  }

  //static subset (xs, ys) {
  //  return xs.elements.every (x => CustomSet.member (x, ys));
  //}

  static subset (xs, ys) {
    return xs.elements.every (x => ys.elements.some (y => x === y));
  }

  //static disjoint (xs, ys) {
  //  return xs.elements.every (x => !CustomSet.member (x, ys));
  //}

  static disjoint (xs, ys) {
    return xs.elements.every (x => ys.elements.every (y => x !== y));
  }

  static setEquality (xs, ys) {
    return CustomSet.subset (xs, ys) && CustomSet.subset (ys, xs);
  }

  static powerSet (xs) {
    let arr = (function reverseInput (xs) {
      return (function getPS (xs, base) {
        return (
          !xs.length ?
          base
          : [ getPS (xs.slice (1), base), getPS (xs.slice (1), [ xs[0], ...base ]) ]
        );
      }) (xs, []).flat (xs.length - 1);
    }) (xs.elements.reverse ());
    return CustomSet.Set (arr);
  }

  static cartesianProduct (xs, ys) {
    let arr = (function getProduct (xs, ys) {
      if (!xs.length) return [];
      return (function (xsProd) {
        return (function pair (ys) {
          return (
            !ys.length ?
            xsProd
            : [ [xs[0], ys[0]], ...pair (ys.slice (1)) ]
          );
        }) (ys);
      }) (getProduct (xs.slice (1), ys));
    }) (xs.elements, ys.elements);
    return CustomSet.Set (arr);
  }
}

module.exports.CustomSet = CustomSet;
