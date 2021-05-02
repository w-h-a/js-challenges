"use strict";

class Element {
  constructor(num) {
    this.num = num;
    this.neighbor = null;
  }

  datum() {
    return this.num;
  }

  next() {
    return this.neighbor;
  }

  isTail() {
    return !this.neighbor;
  }
}

class SimpleLinkedList extends Array {
  static fromArray(arr) {
    return arr ? new SimpleLinkedList(arr) : new SimpleLinkedList();
  }

  constructor(arr = []) {
    super();
    for (let idx = 0; idx < arr.length; idx += 1) {
      this.add(arr[idx]);
    }
  }

  add(nextValue) {
    nextValue = new Element(nextValue);
    this.push(nextValue);
    if (this.length > 1) {
      nextValue.neighbor = this[this.length - 2];
    }
  }

  size() {
    return this.length;
  }

  head() {
    if (this.length === 0) {
      return null;
    } else {
      return this[this.length - 1];
    }
  }

  toArray() {
    var newArr = [];
    for (let idx = 0; idx < this.length; idx += 1) {
      newArr.push(this[idx].datum());
    }
    return newArr;
  }

  isEmpty() {
    return this.length === 0;
  }

  peek() {
    return this.head() ? this.head().datum() : this.head();
  }

  remove() {
    return this.pop().datum();
  }

  reverse() {
    var arrToGoFrom = this.toArray().reverse();
    return new SimpleLinkedList(arrToGoFrom);
  }
}

Object.assign(module.exports, {
  SimpleLinkedList,
  Element
});
