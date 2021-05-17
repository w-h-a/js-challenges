"use strict";

module.exports.NucleotideCounts = (function NucleotideCounts() {
  var publicAPI = {
    parse,
    toCounts
  };
  return publicAPI;

  function parse(seq) {
    if (seq.match(/[^ACGT]/g)) throw new Error('Invalid nucleotide in strand');
    return Object.values(seq.split('').reduce(this.toCounts, {A: 0, C: 0, G: 0, T: 0})).join(' ');
  }

  function toCounts(acc, ele, idx, arr) {
    acc[ele] += 1;
    return acc;
  }
})();
