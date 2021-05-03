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
    return this.elements.every(elementIsContainedIn, otherSet);
  }

  isDisjoint(otherSet) {
    return this.elements.every(elementIsNotContainedIn, otherSet) && otherSet.elements.every(elementIsNotContainedIn, this);
  }

  isSame(otherSet) {
    return this.elements.every(elementIsContainedIn, otherSet) && otherSet.elements.every(elementIsContainedIn, this);
  }

  union(otherSet) {
    var result = new CustomSet(this.elements);
    otherSet.elements.forEach(elementAddTo, result);
    return result;
  }

  intersection(otherSet) {
    var filteredElements = this.elements.filter(elementIsContainedIn, otherSet);
    return new CustomSet(filteredElements);
  }

  difference(otherSet) {
    var filteredElements = this.elements.filter(elementIsNotContainedIn, otherSet);
    return new CustomSet(filteredElements);
  }
}

function elementIsContainedIn(ele) {
  return this.contains(ele);
}

function elementIsNotContainedIn(ele) {
  return !this.contains(ele);
}

function elementAddTo(ele) {
  return this.add(ele);
}

module.exports.CustomSet = CustomSet;
