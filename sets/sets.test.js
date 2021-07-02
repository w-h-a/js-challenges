var { CustomSet } = require ('./sets');

describe('CustomSet', () => {
  describe('empty: returns true if the set contains no elements', () => {
    test('sets with no elements are empty', () => {
      const actual = CustomSet.empty(CustomSet.Set ([]));
      expect(actual).toBe(true);
    });

    test('sets with elements are not empty', () => {
      const actual = CustomSet.empty(CustomSet.Set ([1]));
      expect(actual).toBe(false);
    });
  });

  describe('contains: sets can report if they contain an element', () => {
    test('nothing is contained in an empty set', () => {
      const actual = CustomSet.member(1, CustomSet.Set ([]));
      expect(actual).toBe(false);
    });

    test('when the element is in the set', () => {
      const actual = CustomSet.member(1, CustomSet.Set ([1, 2, 3]));
      expect(actual).toBe(true);
    });

    test('when the element is not in the set', () => {
      const actual = CustomSet.member(4, CustomSet.Set ([1, 2, 3]));
      expect(actual).toBe(false);
    });
  });

  describe('subset: a set is a subset if all of its elements are contained in the other set', () => {
    test('empty set is a subset of another empty set', () => {
      const actual = CustomSet.subset(CustomSet.Set ([]), CustomSet.Set ([]));
      expect(actual).toBe(true);
    });

    test('empty set is a subset of non-empty set', () => {
      const actual = CustomSet.subset(CustomSet.Set ([]), CustomSet.Set ([1]));
      expect(actual).toBe(true);
    });

    test('non-empty set is not a subset of empty set', () => {
      const actual = CustomSet.subset(CustomSet.Set ([1]), CustomSet.Set ([]));
      expect(actual).toBe(false);
    });

    test('set is a subset of set with exact same elements', () => {
      const actual = CustomSet.subset(CustomSet.Set ([1, 2, 3]), CustomSet.Set ([1, 2, 3]));
      expect(actual).toBe(true);
    });

    test('set is a subset of larger set with same elements', () => {
      const actual = CustomSet.subset(CustomSet.Set ([1, 2, 3]), CustomSet.Set ([4, 1, 2, 3]) );
      expect(actual).toBe(true);
    });

    test('set is not a subset of set that does not contain its elements', () => {
      const actual = CustomSet.subset(CustomSet.Set ([1, 2, 3]), CustomSet.Set ([4, 1, 3]));
      expect(actual).toBe(false);
    });
  });

  describe('disjoint: sets are disjoint if they share no elements', () => {
    test('the empty set is disjoint with itself', () => {
      const actual = CustomSet.disjoint (CustomSet.Set ([]), CustomSet.Set ([]))
      expect(actual).toBe(true);
    });

    test('empty set is disjoint with non-empty set', () => {
      const actual = CustomSet.disjoint (CustomSet.Set ([]), CustomSet.Set ([1]));
      expect(actual).toBe(true);
    });

    test('non-empty set is disjoint with empty set', () => {
      const actual = CustomSet.disjoint (CustomSet.Set ([1]), CustomSet.Set ([]));
      expect(actual).toBe(true);
    });

    test('sets are not disjoint if they share an element', () => {
      const actual = CustomSet.disjoint (CustomSet.Set ([1, 2]), CustomSet.Set ([2, 3]));
      expect(actual).toBe(false);
    });

    test('sets are disjoint if they share no elements', () => {
      const actual = CustomSet.disjoint (CustomSet.Set ([1, 2]), CustomSet.Set ([3, 4]));
      expect(actual).toBe(true);
    });
  });

  describe('eql: sets with the same elements are equal', () => {
    test('empty sets are equal', () => {
      const actual = CustomSet.setEquality (CustomSet.Set ([]), CustomSet.Set ([]));
      expect(actual).toBe(true);
    });

    test('empty set is not equal to non-empty set', () => {
      const actual = CustomSet.setEquality (CustomSet.Set ([]), CustomSet.Set ([1, 2, 3]));
      expect(actual).toBe(false);
    });

    test('non-empty set is not equal to empty set', () => {
      const actual = CustomSet.setEquality (CustomSet.Set ([1, 2, 3]), CustomSet.Set ([]));
      expect(actual).toBe(false);
    });

    test('sets with the same elements are equal', () => {
      const actual = CustomSet.setEquality (CustomSet.Set ([1, 2]), CustomSet.Set ([2, 1]));
      expect(actual).toBe(true);
    });

    test('sets with different elements are not equal', () => {
      const actual = CustomSet.setEquality (CustomSet.Set ([1, 2, 3]), CustomSet.Set ([1, 2, 4]));
      expect(actual).toBe(false);
    });
    test('set is not equal to larger set with same elements', () => {
      const actual = CustomSet.setEquality (CustomSet.Set ([1, 2, 3]), CustomSet.Set ([1, 2, 3, 4]));
      expect(actual).toBe(false);
    });
  });

  describe('add: unique elements can be added to a set', () => {
    test('add to empty set', () => {
      const actual = CustomSet.newMem (3, CustomSet.Set ([]));
      const expected = CustomSet.Set ([3]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('add to non-empty set', () => {
      const actual = CustomSet.newMem (3, CustomSet.Set ([1, 2, 4]));
      const expected = CustomSet.Set ([1, 2, 3, 4]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('adding an existing element does not change the set', () => {
      const actual = CustomSet.newMem (3, CustomSet.Set ([1, 2, 3]));
      const expected = CustomSet.Set ([1, 2, 3]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });
  });

  describe('intersection: returns a set of all shared elements', () => {
    test('intersection of two empty sets is an empty set', () => {
      const actual = CustomSet.intersection (CustomSet.Set ([]), CustomSet.Set ([]));
      const expected = CustomSet.Set ([]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('intersection of an empty set and non-empty set is an empty set', () => {
      const actual = CustomSet.intersection (CustomSet.Set ([]), CustomSet.Set ([3, 2, 5]));
      const expected = CustomSet.Set ([]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('intersection of a non-empty set and an empty set is an empty set', () => {
      const actual = CustomSet.intersection (CustomSet.Set ([1, 2, 3, 4]), CustomSet.Set ([]));
      const expected = CustomSet.Set ([]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('intersection of two sets with no shared elements is an empty set', () => {
      const actual = CustomSet.intersection (CustomSet.Set ([1, 2, 3]), CustomSet.Set ([4, 5, 6]));
      const expected = CustomSet.Set ([]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('intersection of two sets with shared elements is a set of the shared elements', () => {
      const actual = CustomSet.intersection (CustomSet.Set ([1, 2, 3, 4]), CustomSet.Set ([3, 2, 5]));
      const expected = CustomSet.Set ([2, 3]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });
  });

  describe('difference of a set is a set of all elements that are only in the first set', () => {
    test('difference of two empty sets is an empty set', () => {
      const actual = CustomSet.difference (CustomSet.Set ([]), CustomSet.Set ([]));
      const expected = CustomSet.Set ([]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('difference of empty set and non-empty set is an empty set', () => {
      const actual = CustomSet.difference (CustomSet.Set ([]), CustomSet.Set ([3, 2, 5]));
      const expected = CustomSet.Set ([]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('difference of a non-empty set and an empty set is the non-empty set', () => {
      const actual = CustomSet.difference (CustomSet.Set ([1, 2, 3, 4]), CustomSet.Set ([]));
      const expected = CustomSet.Set ([1, 2, 3, 4]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('difference of two non-empty sets is a set of elements that are only in the first set', () => {
      const actual = CustomSet.difference (CustomSet.Set ([3, 2, 1]), CustomSet.Set ([2, 4]));
      const expected = CustomSet.Set ([1, 3]);
      expect(CustomSet.setEquality (actual, expected)).toBe(true);
    });
  });

  describe('union: returns a set of all elements in either set', () => {
    test('union of empty sets is an empty set', () => {
      const actual = CustomSet.union (CustomSet.Set ([]), CustomSet.Set ([]));
      const expected = CustomSet.Set ([]);
      expect (CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('union of an empty set and non-empty set is the non-empty set', () => {
      const actual = CustomSet.union (CustomSet.Set ([]), CustomSet.Set ([2]));
      const expected = CustomSet.Set ([2]);
      expect (CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('union of a non-empty set and empty set is the non-empty set', () => {
      const actual = CustomSet.union (CustomSet.Set ([1, 3]), CustomSet.Set ([]));
      const expected = CustomSet.Set ([1, 3]);
      expect (CustomSet.setEquality (actual, expected)).toBe(true);
    });

    test('union of non-empty sets contains all unique elements', () => {
      const actual = CustomSet.union (CustomSet.Set ([1, 3]), CustomSet.Set ([2, 3]));
      const expected = CustomSet.Set ([1, 2, 3]);
      expect (CustomSet.setEquality (actual, expected)).toBe(true);
    });
  });

  describe ('power sets and cartesian products', () => {
    test ('power set', () => {
      const actual = CustomSet.powerSet (CustomSet.Set (["the", "weird", "sisters"]));
      const expected = CustomSet.Set (
        [
          [],
          [ 'the' ],
          [ 'weird' ],
          [ 'the', 'weird' ],
          [ 'sisters' ],
          [ 'the', 'sisters' ],
          [ 'weird', 'sisters' ],
          [ 'the', 'weird', 'sisters' ]
        ]
      );
      expect (actual).toEqual (expected);
    });

    test ('cartesian product', () => {
      const actual = CustomSet.cartesianProduct (CustomSet.Set ([2, 5]), CustomSet.Set (["moons", "stars", "planets"]));
      const expected = CustomSet.Set (
        [
          [ 2, 'moons' ],
          [ 2, 'stars' ],
          [ 2, 'planets' ],
          [ 5, 'moons' ],
          [ 5, 'stars' ],
          [ 5, 'planets' ]
        ]
      );
      expect (actual).toEqual (expected);
    });
  });
});
