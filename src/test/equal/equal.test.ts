import { equal } from "../../equal";

describe("equal", () => {
  test("test non-equal ArrayBuffers", () => {
    const first = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const second = new Uint8Array([0, 1, 2, 3, 4, 0, 6, 7, 8, 9, 10]);

    expect(equal(first, second)).toEqual(false);
  });

  test("test equal ArrayBuffers", () => {
    const first = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const second = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    expect(equal(first, second)).toEqual(true);
  });
});
