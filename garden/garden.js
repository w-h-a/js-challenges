"use strict";

module.exports.Garden = Garden;

const DEFAULT_STUDENTS = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry',
];

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
};

function Garden(diagram, students = DEFAULT_STUDENTS) {
  var firstRow = diagram.split('\n')[0];
  var secondRow = diagram.split('\n')[1];
  students.sort();

  var publicInterface = { plants };
  return publicInterface;

  function plants(student) {
    var idx = students.indexOf(student);
    return [PLANT_CODES[firstRow[idx * 2]], PLANT_CODES[firstRow[idx * 2 + 1]], PLANT_CODES[secondRow[idx * 2]], PLANT_CODES[secondRow[idx * 2 + 1]]];
  }
}
