"use strict";

const Diamond = require('./diamond.js');

describe('Diamond', () => {
  test("Degenerate case with a single 'A' row", () => {
    expect(Diamond.makeDiamond('A')).toEqual(['A'].join(''));
  });

  test('Degenerate case with no row containing 3 distinct groups of spaces', () => {
    // prettier-ignore
    expect(Diamond.makeDiamond('B')).toEqual([
      ' A ',
      'B B',
      ' A '
    ].join('\n'));
  });

  test('Smallest non-degenerate case with odd diamond side length', () => {
    // prettier-ignore
    expect(Diamond.makeDiamond('C')).toEqual([
      '  A  ',
      ' B B ',
      'C   C',
      ' B B ',
      '  A  '
    ].join('\n'));
  });

  test('Smallest non-degenerate case with even diamond side length', () => {
    expect(Diamond.makeDiamond('D')).toEqual([
      '   A   ',
      '  B B  ',
      ' C   C ',
      'D     D',
      ' C   C ',
      '  B B  ',
      '   A   ',
    ].join('\n'));
  });

  test("letter e", () => {
  let answer = Diamond.makeDiamond('E');
  let expected = [
    "    A    ",
    "   B B   ",
    "  C   C  ",
    " D     D ",
    "E       E",
    " D     D ",
    "  C   C  ",
    "   B B   ",
    "    A    ",
  ].join("\n");
  expect(answer).toBe(expected);
});

  test('Largest possible diamond', () => {
    expect(Diamond.makeDiamond('Z')).toEqual([
      '                         A                         ',
      '                        B B                        ',
      '                       C   C                       ',
      '                      D     D                      ',
      '                     E       E                     ',
      '                    F         F                    ',
      '                   G           G                   ',
      '                  H             H                  ',
      '                 I               I                 ',
      '                J                 J                ',
      '               K                   K               ',
      '              L                     L              ',
      '             M                       M             ',
      '            N                         N            ',
      '           O                           O           ',
      '          P                             P          ',
      '         Q                               Q         ',
      '        R                                 R        ',
      '       S                                   S       ',
      '      T                                     T      ',
      '     U                                       U     ',
      '    V                                         V    ',
      '   W                                           W   ',
      '  X                                             X  ',
      ' Y                                               Y ',
      'Z                                                 Z',
      ' Y                                               Y ',
      '  X                                             X  ',
      '   W                                           W   ',
      '    V                                         V    ',
      '     U                                       U     ',
      '      T                                     T      ',
      '       S                                   S       ',
      '        R                                 R        ',
      '         Q                               Q         ',
      '          P                             P          ',
      '           O                           O           ',
      '            N                         N            ',
      '             M                       M             ',
      '              L                     L              ',
      '               K                   K               ',
      '                J                 J                ',
      '                 I               I                 ',
      '                  H             H                  ',
      '                   G           G                   ',
      '                    F         F                    ',
      '                     E       E                     ',
      '                      D     D                      ',
      '                       C   C                       ',
      '                        B B                        ',
      '                         A                         ',
    ].join('\n'));
  });
});
