"use strict";

class Sequence {
  static setType () {
    return Object.create (Sequence.prototype);
  }

  static Nil () {
    let nil = Sequence.setType ();
    nil.kind = "nil";
    return nil;
  }

  static Stream (curr, nextFunc) {
    let stream = Sequence.setType ();
    stream.kind = "stream";
    stream.curr = curr;
    stream.nextFunc = nextFunc;
    return stream;
  }

  static iterates (func) {
    return (ele) => {
      return Sequence.Stream (ele, () => Sequence.iterates (func) (func (ele)));
    }
  }

  static take (sequence, n) {
    if (sequence.kind === 'nil') throw new Error ('nil sequence');
    return (
      sequence.curr <= n ?
      [ sequence.curr, ...Sequence.take (sequence.nextFunc (), n) ]
      : []
    );
  }

  static filter (condition) {
    return (sequence) => {
      if (sequence.kind === 'nil') return sequence;
      return (
        condition (sequence.curr) ?
        Sequence.Stream (sequence.curr, () => Sequence.filter (condition) (sequence.nextFunc ()))
        : Sequence.filter (condition) (sequence.nextFunc ())
      );
    }
  }
}

// application of Sequence

function sift (p) {
  return Sequence.filter (n => n % p !== 0);
}

function sieve (sequence) {
  return Sequence.Stream (
    sequence.curr,
    () => sieve (sift (sequence.curr) (sequence.nextFunc ()))
  );
}

var it = sieve (Sequence.iterates ((ele) => ele + 1) (2));

function primes (n) {
  return Sequence.take (it, n);
}

module.exports.primes = primes;
