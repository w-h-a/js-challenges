let PerfectNumber = require('./perfect-nums');

describe('Exercise - Perfect Numbers', () => {
  describe('Invalid Inputs', () => {
    test('Zero is rejected (not a natural number)', () => {
      expect(() => PerfectNumber.classify(0)).toThrow(
        new Error('Classification is only for natural numbers')
      );
    });

    test('Negative integer is rejected (not a natural number)', () => {
      expect(() => PerfectNumber.classify(-1)).toThrow(
        new Error('Classification is only for natural numbers')
      );
    });
  });

  describe('Perfect Numbers', () => {
    test('Smallest perfect number is classified correctly', () => {
      expect(PerfectNumber.classify(6)).toEqual('perfect');
    });

    test('Medium perfect number is classified correctly', () => {
      expect(PerfectNumber.classify(28)).toEqual('perfect');
    });

    test('Large perfect number is classified correctly', () => {
      expect(PerfectNumber.classify(33550336)).toEqual('perfect');
    });
  });

  describe('Abundant Numbers', () => {
    test('Smallest abundant number is classified correctly', () => {
      expect(PerfectNumber.classify(12)).toEqual('abundant');
    });

    test('Medium abundant number is classified correctly', () => {
      expect(PerfectNumber.classify(30)).toEqual('abundant');
    });

    test('Large abundant number is classified correctly', () => {
      expect(PerfectNumber.classify(33550335)).toEqual('abundant');
    });
  });

  describe('Deficient Numbers', () => {
    test('Edge case (no factors other than itself) is classified correctly', () => {
      expect(PerfectNumber.classify(1)).toEqual('deficient');
    });

    test('Smallest prime deficient number is classified correctly', () => {
      expect(PerfectNumber.classify(2)).toEqual('deficient');
    });

    test('Smallest non-prime deficient number is classified correctly', () => {
      expect(PerfectNumber.classify(4)).toEqual('deficient');
    });

    test("Medium deficient number is classified correctly 1", () => {
      expect(PerfectNumber.classify(13)).toEqual('deficient');
    });

    test('Medium deficient number is classified correctly 2', () => {
      expect(PerfectNumber.classify(32)).toEqual('deficient');
    });

    test('Large deficient number is classified correctly', () => {
      expect(PerfectNumber.classify(33550337)).toEqual('deficient');
    });
  });
});
