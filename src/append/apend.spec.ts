import { appendArrayBuffer } from "."
import { equal } from "../equal";

describe("append", () => {
  test("append buffer to buffer", () => {
    const arr1 = uint8Array(5);
    const arr2 = uint8Array(6);
    const arr12 = [...arr1, ...arr2];
    const arr21 = [...arr2, ...arr1]

    const buf1 = new Uint8Array(arr1).buffer;
    const buf2 = new Uint8Array(arr2).buffer;
    const buf12 = appendArrayBuffer(buf1, buf2)
    expect(equal(new Uint8Array(arr12), buf12)).toBe(true);
    expect(equal(new Uint8Array(arr21), buf12)).toBe(false);
  })
})

function uint8Array(len: number): number[] {
  const arr = []
  for (let i=0; i<len; i++) {
    arr.push(randomUint8())
  }
  return arr;
}

function randomUint8(): number {
  return Math.floor(Math.random() * 256)
}