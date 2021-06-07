import { arrayBufferToHex, hexToArrayBuffer } from "../../hex";
import { equal } from "../../equal/equal";
import { BYTE_ARRAY_LEN256, BYTE_ARRAY_HEX } from "./testdata";

describe("arrayBufferToHex", () => {
  test("-> check all possibilities in random order", () => {
    const view = new Uint8Array(BYTE_ARRAY_LEN256);

    const hex = arrayBufferToHex(view);
    expect(hex).toEqual(BYTE_ARRAY_HEX);
  });
});

describe("hexToArrayBuffer", () => {
  test("-> throw error on invalid length", () => {
    const hex = "00112233f";

    expect(() => {
      hexToArrayBuffer(hex);
    }).toThrow("not valid hex length! len:" + hex.length.toString(10));
  });

  test("-> check output ArrayBuffer", () => {
    const compare = new Uint8Array(BYTE_ARRAY_LEN256);

    const result = hexToArrayBuffer(BYTE_ARRAY_HEX);
    expect(equal(result, compare)).toEqual(true);
  });
});
