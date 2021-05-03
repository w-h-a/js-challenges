"use strict";

class CustomSet {
  constructor(arr = []) {
    this.elements = [];
    this.add(...arr);
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  contains(ele) {
    return this.elements.includes(ele);
  }

  add(...eles) {
    for (let idx = 0; idx < eles.length; idx += 1) {
      if (!this.contains(eles[idx])) {
        this.elements.push(eles[idx]);
      }
    }
    return this;
  }

  isSubset(otherSet) {
    return this.elements.every(elementContainedIn, otherSet);
  }

  isDisjoint(otherSet) {
    return this.elements.every(elementNotContainedIn, otherSet) && otherSet.elements.every(elementNotContainedIn, this);
  }

  isSame(otherSet) {
    return this.elements.every(elementContainedIn, otherSet) && otherSet.elements.every(elementContainedIn, this);
  }

  union(otherSet) {
    var result = new CustomSet(this.elements);
    otherSet.elements.forEach(elementAddTo, result);
    return result;
  }

  intersection(otherSet) {
    var filteredElements = this.elements.filter(elementContainedIn, otherSet);
    return new CustomSet(filteredElements);
  }

  difference(otherSet) {
    var filteredElements = this.elements.filter(elementNotContainedIn, otherSet);
    return new CustomSet(filteredElements);
  }
}

function elementContainedIn(ele) {
  return this.contains(ele);
}

function elementNotContainedIn(ele) {
  return !this.contains(ele);
}

function elementAddTo(ele) {
  return this.add(ele);
}

module.exports.CustomSet = CustomSet;
