import { splitArrayBufferAt } from ".";
import { equal } from "../equal";

describe("split", () => {
  test("split ArrayBuffer at index smaller than max", () => {
    const arr1 = uint8Array(5);
    const arr2 = uint8Array(6);
    const arr12 = [...arr1, ...arr2];
    const { buf1, buf2 } = splitArrayBufferAt(new Uint8Array(arr12).buffer, 5);

    expect(equal(buf1, new Uint8Array(arr1))).toBe(true);
    expect(equal(buf2, new Uint8Array(arr2))).toBe(true);
  });

  test("split throws error when at larger than ArrayBuffer", () => {
    const arr = uint8Array(5);
    const buf = new Uint8Array(arr).buffer;

    expect(() => splitArrayBufferAt(buf, 6)).toThrowError("index exceeds ArrayBuffer! lenght: 5, index: 6");
  });

  test("split at the end of ArrayBuffer", () => {
    const arr = uint8Array(5);
    const { buf1 } = splitArrayBufferAt(new Uint8Array(arr), 5);

    expect(equal(buf1, new Uint8Array(arr))).toBe(true);
  });
});

function uint8Array(len: number): number[] {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(randomUint8());
  }
  return arr;
}

function randomUint8(): number {
  return Math.floor(Math.random() * 256);
}
