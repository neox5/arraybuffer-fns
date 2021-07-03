import { validatedBase64, arrayBufferToBase64, base64ToArrayBuffer } from ".";
import { equal } from "../equal";

describe("validateBase64", () => {
  test("character set", () => {
    const correct = "ABCDEFE=";
    const incorrect = "AB?DEFE=";

    expect(validatedBase64(correct)).toEqual(true);
    expect(validatedBase64(incorrect)).toEqual(false);
  });

  test("string length", () => {
    const correct = "ABCDEFE=";
    const incorrect = "ADEFE="; // not dividable by 4

    expect(validatedBase64(correct)).toEqual(true);
    expect(validatedBase64(incorrect)).toEqual(false);
  });
});

describe("arrayBufferToBase64", () => {
  test("check length with no padding", () => {
    // length has to be dividable by 3
    const ab = new Uint8Array([149, 68, 136, 193, 138, 46, 7, 182, 20]);

    const b64 = arrayBufferToBase64(ab);
    expect(b64[b64.length - 1]).not.toEqual("=");
  });

  test("check length with 1 padding", () => {
    const ab = new Uint8Array([149, 68, 136, 193, 138, 46, 7, 182, 20, 9, 54]);

    const b64 = arrayBufferToBase64(ab);
    expect(b64[b64.length - 1]).toEqual("=");
    expect(b64[b64.length - 2]).not.toEqual("=");
  });

  test("check length with 2 paddings", () => {
    const ab = new Uint8Array([149, 68, 136, 193, 138, 46, 7, 182, 20, 9]);

    const b64 = arrayBufferToBase64(ab);
    expect(b64[b64.length - 1]).toEqual("=");
    expect(b64[b64.length - 2]).toEqual("=");
  });

  test("check output", () => {
    const ab = new Uint8Array([149, 68, 136, 193, 138, 46, 7, 182, 20, 9]);

    const b64 = arrayBufferToBase64(ab);
    expect(b64).toEqual("lUSIwYouB7YUCQ==");
  });
});

describe("base64ToArrayBuffer", () => {
  test("b64 validation", () => {
    const str = "this is not valid base64";

    expect(() => {
      base64ToArrayBuffer(str);
    }).toThrow("not a valid base64 string: " + str);
  });

  test("check output", () => {
    const b64 = "lUSIwYouB7YUCQ==";
    const compare = new Uint8Array([149, 68, 136, 193, 138, 46, 7, 182, 20, 9]);
    const result = base64ToArrayBuffer(b64);

    expect(equal(result, compare)).toEqual(true);
  });
});
