"use strict";

module.exports.dna = dna;

function dna(myDNA) {
  var publicInterface = {
    computeHamming
  };
  return publicInterface;

  function computeHamming(compDNA) {
    if (myDNA.length === 0 && compDNA.length !== 0) throw new Error("if comparison strand is not empty, my strand must not be empty");
    if (compDNA.length === 0 && myDNA.length !== 0) throw new Error("if my strand is not empty, comparison strand must not be empty");
    if (myDNA === compDNA) return 0;

    var minLen = Math.min(myDNA.length, compDNA.length);

    var result = 0;

    for (let idx = 0; idx < minLen; idx += 1) {
      if (myDNA[idx] !== compDNA[idx]) {
        result += 1;
      }
    }

    return result;
  }
}
