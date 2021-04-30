"use strict";

var DNA = require("./hamming").dna;

describe("Hamming", function() {
  test("disallow myDNA to be empty under certain conditions", function() {
    var me = DNA('');
    expect(function() {
      me.computeHamming('G');
    }).toThrow(new Error("if comparison strand is not empty, my strand must not be empty"));
  });

  test("disallow comparison to be empty under certain conditions", function() {
    var me = DNA('G');
    expect(function() {
      me.computeHamming('');
    }).toThrow(new Error("if my strand is not empty, comparison strand must not be empty"));
  });

  test("no difference between empties", function() {
    var me = DNA('');
    expect(me.computeHamming('')).toBe(0);
  });

  test("no difference between identical strands", function() {
    var me = DNA("GGACTGA");
    expect(me.computeHamming("GGACTGA")).toBe(0);
  });

  test("complete hamming distance in small strand", function() {
    var me = DNA("ACT");
    expect(me.computeHamming("GGA")).toBe(3);
  });

  test("hamming distance is off by one strand", function() {
    var mine = "GGACGGATTCTGACCTGGACTAATTTTGGGG";
    var comparative = "AGGACGGATTCTGACCTGGACTAATTTTGGGG";
    var me = DNA(mine);
    expect(me.computeHamming(comparative)).toBe(19);
  });

  test("small hamming distance in middle somewhere", function() {
    var me = DNA("GGACG");
    expect(me.computeHamming("GGTCG")).toBe(1);
  });

  test("larger distance", function() {
    var me = DNA("ACCAGGG");
    expect(me.computeHamming("ACTATGG")).toBe(2);
  });

  test("ignores extra 1", function() {
    var me = DNA("AAACTAGGGG");
    expect(me.computeHamming("AGGCTAGCGGTAGGAC")).toBe(3);
  });

  test("ignores extra 2", function() {
    var me = DNA("GACTACGGACAGGGTAGGGAAT");
    expect(me.computeHamming("GACATCGCACACC")).toBe(5);
  });

  test("does not shorten strands", function() {
    var me = DNA("AGACAACAGCCAGCCGCCGGATT");
    expect(me.computeHamming("AGGCAA")).toBe(1);
    expect(me.computeHamming("AGACATCTTTCAGCCGCCGGATTAGGCAA")).toBe(4);
    expect(me.computeHamming("AGG")).toBe(1);
  });
});
