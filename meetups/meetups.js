"use strict";

module.exports.Meetup = Meetup;

function Meetup(year, month) {
  var dayStrToNum = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };
  var descStrToStart = {
    first: 1,
    second: 8,
    third: 15,
    fourth: 22,
    fifth: 29,
    teenth: 13
  };
  var publicInterface = {
    day
  };
  return publicInterface;

  function day(dayStr, desc) {
    dayStr = dayStr.toLowerCase();
    desc = desc.toLowerCase();

    if (desc !== "last") {
      return helpee(dayStr, descStrToStart[desc]);
    }
    var date = new Date(year, month, 1);
    date.setDate(date.getDate() - 1);
    while (date.getDay() !== dayStrToNum[dayStr]) {
      date.setDate(date.getDate() - 1);
    }
    return new Date(year, month - 1, date.getDate())
  }

  function helpee(dayStr, descNum) {
    var date = new Date(year, month - 1, descNum);
    var mo = date.getMonth();
    while (date.getDay() !== dayStrToNum[dayStr]) {
      date.setDate(date.getDate() + 1);
      if (date.getMonth() !== mo) return null;
    }
    return new Date(year, month - 1, date.getDate());
  }
}
