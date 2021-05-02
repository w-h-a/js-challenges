"use strict";

let Robot = require('./robot').init;
Math.seedrandom = require('seedrandom');

const areSequential = (name1, name2) => {
  const alpha1 = name1.substr(0, 2);
  const alpha2 = name2.substr(0, 2);
  const num1 = +name1.substr(2, 3);
  const num2 = +name2.substr(2, 3);

  const numDiff = num2 - num1;
  const alphaDiff =
    (alpha2.charCodeAt(0) - alpha1.charCodeAt(0)) * 26 +
    (alpha2.charCodeAt(1) - alpha1.charCodeAt(1));

  const totalDiff = alphaDiff * 1000 + numDiff;

  return Math.abs(totalDiff) <= 1;
};

const TOTAL_NUMBER_OF_NAMES =
  26 * // A-Z
  26 * // A-Z
  10 * // 0-9
  10 * // 0-9
  10; // 0-9

const NAME_REGEXP = /^[A-Z]{2}\d{3}$/;
const DIFFERENT_ROBOT_NAME_SEED = 1234;
const SAME_INITIAL_ROBOT_NAME_SEED = 1000;

describe("Robot Name", () => {
  var robot;

  beforeEach(function() {
    robot = new Robot();
  });
  afterEach(function() {
    Robot.releaseNames();
  });

  test("has name", () => {
    expect(robot.name()).toMatch(NAME_REGEXP);
  });

  test("name sticks", () => {
    let name = robot.name();
    expect(robot.name()).toBe(name);
  });

  test("different robots have different names", () => {
    Math.seedrandom(DIFFERENT_ROBOT_NAME_SEED);

    let robot1 = new Robot();
    let robot2 = new Robot();

    expect(robot1.name()).not.toBe(robot2.name());
  });

  test("different name when chosen name is taken", () => {
    Math.seedrandom(SAME_INITIAL_ROBOT_NAME_SEED);
    let robot1 = new Robot();
    Math.seedrandom(SAME_INITIAL_ROBOT_NAME_SEED);
    let robot2 = new Robot();
    expect(robot1.name()).not.toBe(robot2.name());
  });

  test("reset name", () => {
    Math.seedrandom(DIFFERENT_ROBOT_NAME_SEED);

    let robot = new Robot();
    let name1 = robot.name();
    robot.reset();
    let name2 = robot.name();

    expect(name1).not.toBe(name2);
  });

  test('should set a unique name after reset', () => {
    const NUMBER_OF_ROBOTS = 10000;
    const usedNames = new Set();

    usedNames.add(robot.name());
    for (let i = 0; i < NUMBER_OF_ROBOTS; i += 1) {
      robot.reset();
      usedNames.add(robot.name());
    }

    expect(usedNames.size).toEqual(NUMBER_OF_ROBOTS + 1);
  });

  test('new names should not be sequential', () => {
    const name1 = robot.name();
    const name2 = new Robot().name();
    const name3 = new Robot().name();
    expect(areSequential(name1, name1)).toBe(true);
    expect(areSequential(name1, name2)).toBe(false);
    expect(areSequential(name2, name3)).toBe(false);
  });

  test('names from reset should not be sequential', () => {
    const name1 = robot.name();
    robot.reset();
    const name2 = robot.name();
    robot.reset();
    const name3 = robot.name();
    expect(areSequential(name1, name2)).toBe(false);
    expect(areSequential(name2, name3)).toBe(false);
    expect(areSequential(name3, name3)).toBe(true);
  });

  test('all the names can be generated', () => {
    const usedNames = new Set();
    usedNames.add(robot.name());

    for (let i = 0; i < TOTAL_NUMBER_OF_NAMES - 1; i += 1) {
      const newRobot = new Robot();
      usedNames.add(newRobot.name());
    }

    expect(usedNames.size).toEqual(TOTAL_NUMBER_OF_NAMES);
  });
});
