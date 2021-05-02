"use strict";

const CircularBuffer = require('./buffer').CircularBuffer;
const BufferFullError = require('./buffer').BufferFullError;
const BufferEmptyError = require('./buffer').BufferEmptyError;

describe('CircularBuffer', () => {
  test('reading empty buffer should fail', () => {
    const buffer = new CircularBuffer(1);
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('can read an item just written', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(buffer.read()).toBe('1');
  });

  test('each item may only be read once', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(buffer.read()).toBe('1');
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('items are read in the order they are written', () => {
    const buffer = new CircularBuffer(2);
    buffer.write('1');
    buffer.write('2');
    expect(buffer.read()).toBe('1');
    expect(buffer.read()).toBe('2');
  });

  test("full buffer can't be written to", () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(() => buffer.write(2)).toThrow(BufferFullError);
  });

  test('a read frees up capacity for another write', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(buffer.read()).toBe('1');
    buffer.write('2');
    expect(buffer.read()).toBe('2');
  });

  test('read position is maintained even across multiple writes', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('1');
    buffer.write('2');
    expect(buffer.read()).toBe('1');
    buffer.write('3');
    expect(buffer.read()).toBe('2');
    expect(buffer.read()).toBe('3');
  });

  test("items cleared out of buffer can't be read", () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    buffer.clear();
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('clear frees up capacity for another write', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    buffer.clear();
    buffer.write('2');
    expect(buffer.read()).toBe('2');
  });

  test('clear does nothing on empty buffer', () => {
    const buffer = new CircularBuffer(1);
    buffer.clear();
    buffer.write('1');
    expect(buffer.read()).toBe('1');
  });

  test('forceWrite acts like write on non-full buffer', () => {
    const buffer = new CircularBuffer(2);
    buffer.write('1');
    buffer.forceWrite('2');
    expect(buffer.read()).toBe('1');
    expect(buffer.read()).toBe('2');
  });

  test('forceWrite replaces the oldest item on full buffer', () => {
    const buffer = new CircularBuffer(2);
    buffer.write('1');
    buffer.write('2');
    buffer.forceWrite('3');
    expect(buffer.read()).toBe('2');
    expect(buffer.read()).toBe('3');
  });

  test('forceWrite replaces the oldest item remaining in buffer following a read', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('1');
    buffer.write('2');
    buffer.write('3');
    expect(buffer.read()).toBe('1');
    buffer.write('4');
    buffer.forceWrite('5');
    expect(buffer.read()).toBe('3');
    expect(buffer.read()).toBe('4');
    expect(buffer.read()).toBe('5');
  });

  test('initial clear does not affect wrapping around', () => {
    const buffer = new CircularBuffer(2);
    buffer.clear();
    buffer.write('1');
    buffer.write('2');
    buffer.forceWrite('3');
    buffer.forceWrite('4');
    expect(buffer.read()).toBe('3');
    expect(buffer.read()).toBe('4');
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test("write and read back one item", () => {
    const bufferSize = 1;
    const buffer = new CircularBuffer(bufferSize);
    buffer.write("1");
    expect(buffer.read()).toBe("1");
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });

  test("write and read back multiple items", () => {
    const bufferSize = 2;
    const buffer = new CircularBuffer(bufferSize);
    buffer.write("1");
    buffer.write("2");
    expect(buffer.read()).toBe("1");
    expect(buffer.read()).toBe("2");
    buffer.write("3");
    buffer.write("4");
    expect(buffer.read()).toBe("3");
    expect(buffer.read()).toBe("4");
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });

  test("clearing a buffer", () => {
    const bufferSize = 2;
    const buffer = new CircularBuffer(bufferSize);
    buffer.write("1");
    buffer.write("2");
    buffer.clear();
    expect(() => buffer.read()).toThrow("Buffer is empty");
    buffer.write("3");
    buffer.write("4");
    expect(buffer.read()).toBe("3");
    expect(buffer.read()).toBe("4");
  });

  test("alternate write and read", () => {
    const bufferSize = 2;
    const buffer = new CircularBuffer(bufferSize);
    buffer.write("1");
    expect(buffer.read()).toBe("1");
    buffer.write("2");
    expect(buffer.read()).toBe("2");
  });

  test("reads back oldest item", () => {
    const buffer = new CircularBuffer(3);
    buffer.write("1");
    buffer.write("2");
    buffer.read();
    buffer.write("3");
    expect(buffer.read()).toBe("2");
    expect(buffer.read()).toBe("3");
  });

  test("writes of undefined or null don't occupy buffer", () => {
    const buffer = new CircularBuffer(3);
    buffer.write(null);
    buffer.write(undefined);
    [1, 2, 3].map(i => buffer.write(i.toString()));
    expect(buffer.read()).toBe("1");
  });

  test("writing to a full buffer throws a BufferFullError", () => {
    const buffer = new CircularBuffer(2);
    buffer.write("1");
    buffer.write("2");
    expect(() => buffer.write("A")).toThrow("Buffer is full");
  });

  test("forced writes over write oldest item in a full buffer", () => {
    const bufferSize = 2;
    const buffer = new CircularBuffer(bufferSize);
    buffer.write("1");
    buffer.write("2");
    buffer.forceWrite("A");
    expect(buffer.read()).toBe("2");
    expect(buffer.read()).toBe("A");
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });

  test("forced writes act like write in a non-full buffer", () => {
    const buffer = new CircularBuffer(2);
    buffer.write("1");
    buffer.forceWrite("2");
    expect(buffer.read()).toBe("1");
    expect(buffer.read()).toBe("2");
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });

  test("alternate force write and read into full buffer", () => {
    const buffer = new CircularBuffer(5);
    [1, 2, 3].map(i => buffer.write(i.toString()));
    buffer.read();
    buffer.read();
    buffer.write("4");
    buffer.read();
    [5, 6, 7, 8].map(i => buffer.write(i.toString()));
    buffer.forceWrite("A");
    buffer.forceWrite("B");
    expect(buffer.read()).toBe("6");
    expect(buffer.read()).toBe("7");
    expect(buffer.read()).toBe("8");
    expect(buffer.read()).toBe("A");
    expect(buffer.read()).toBe("B");
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });
});
