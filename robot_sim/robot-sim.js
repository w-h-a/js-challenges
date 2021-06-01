"use strict";

class InvalidInputError extends Error {}

module.exports.InvalidInputError = InvalidInputError;
module.exports.Robot = Robot;

function Robot(bearings = ["north", "east", "south", "west"], instructions = { A: "advance", L: "turnLeft", R: "turnRight" }) {
  return {
    myBearing: "north",
    myCoordinates: [],
    get bearing() { return this.myBearing; },
    get coordinates() { return [...this.myCoordinates]; },
    place,
    orient,
    at,
    turnRight,
    turnLeft,
    advance,
    evaluate
  };

  function place({ direction, x, y }) {
    this.orient(direction);
    this.at(x, y);
  }

  function orient(direction) {
    ifelser(bearingsDoesNotIncludeDirection, throwNope, setBearing)(this);

    function bearingsDoesNotIncludeDirection() {
      return !bearings.includes(direction);
    }

    function throwNope() {
      throw new InvalidInputError();
    }

    function setBearing(thisArg) {
      thisArg.myBearing = direction;
    }
  }

  function at(...coors) {
    this.myCoordinates = coors;
  }

  function turnRight() {
    this.orient(bearings[(bearings.indexOf(this.myBearing) + 1) % bearings.length]);
  }

  function turnLeft() {
    this.orient(bearings[(bearings.indexOf(this.myBearing) + 3) % bearings.length]);
  }

  function advance() {
    switch (this.myBearing) {
      case "north":
        return this.myCoordinates[1] += 1;
      case "east":
        return this.myCoordinates[0] += 1;
      case "south":
        return this.myCoordinates[1] -= 1;
      case "west":
        return this.myCoordinates[0] -= 1;
    }
  }

  function evaluate(str) {
    instruct(str).forEach(performInstruction, this);

    function performInstruction(instruction) {
      this[instruction]();
    }
  }

  function instruct(str) {
    return [...str].reduce(mapReducer(toInstruction, listCombine), []);

    function toInstruction(ele) {
      return instructions[ele];
    }

    function listCombine(list, ele) {
      list.push(ele);
      return list;
    }
  }
}

function ifelser(relation, func1, func2 = (...args) => undefined) {
  return ifelsed;

  function ifelsed(...args) {
    return relation(...args) ? func1(...args) : func2(...args);
  }
}

function mapReducer(mapper, combiner) {
  return reducer;

  function reducer(list, ele, idx, src) {
    return combiner(list, mapper(ele), idx, src);
  }
}
