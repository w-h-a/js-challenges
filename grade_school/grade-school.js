"use strict";

module.exports.GradeSchool = GradeSchool;

function GradeSchool() {
  var privateData = {};
  var publicAPI = {
    roster,
    add,
    grade
  };
  return publicAPI;
  function roster() {
    return Object.keys(privateData).reduce(toDeepCopy, {});
  }
  function add(name, grade) {
    if (!privateData.hasOwnProperty(grade.toString())) privateData[grade] = [];
    var contextObj = {name};
    Object.keys(privateData).forEach(removeNameOf, contextObj);
    privateData[grade].push(name);
    privateData[grade].sort();
  }
  function grade(grade) {
    return !privateData.hasOwnProperty(grade.toString()) ? [] : privateData[grade].slice();
  }
  function toDeepCopy(acc, ele) {
    acc[ele] = [...privateData[ele]];
    return acc;
  }
  function removeNameOf(arr) {
    if (privateData[arr].includes(this.name)) {
      privateData[arr].splice(privateData[arr].indexOf(this.name), 1);
    }
  }
}
