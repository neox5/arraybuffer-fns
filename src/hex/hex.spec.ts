import { arrayBufferToHex, hexToArrayBuffer } from "./hex";
import { equal } from "../equal/equal";

const BYTE_ARRAY_HEX =
  "e076d8bd0910e64323db24799477132eb1c0b2b31201f63a458a49eba59c6bdab61abb472b46740c9be266d592c2cb7a6cd3dcaca9801b5cd4a14d3c7bfbc3a4032932480dbec4f98c56a39ffde9147e254f2f886d18f068df21705b31de3b933ef3f83f7c27c628ae0aa0849899902091ece744bf83755153f1c7d642ea40360816cd8796eff7cf5415b864a26a399ed1fa6978e134af55616750ff8e2265fcba2c890e4a176f8b5d114cb4e4071d2a85ce059a8641f263eeca574be52db973bcd98d4ecc1cb538971ea7f45a58f5d0d77ffec1728f71ad3581b07d0f3360e862060b023726001959c99d04e330ddc8aaa6a882ed525ec55fb7956e3d1fabd2";
const BYTE_ARRAY_LEN256 = [
  224, 118, 216, 189, 9, 16, 230, 67, 35, 219, 36, 121, 148, 119, 19, 46, 177, 192, 178, 179, 18, 1, 246, 58, 69, 138,
  73, 235, 165, 156, 107, 218, 182, 26, 187, 71, 43, 70, 116, 12, 155, 226, 102, 213, 146, 194, 203, 122, 108, 211, 220,
  172, 169, 128, 27, 92, 212, 161, 77, 60, 123, 251, 195, 164, 3, 41, 50, 72, 13, 190, 196, 249, 140, 86, 163, 159, 253,
  233, 20, 126, 37, 79, 47, 136, 109, 24, 240, 104, 223, 33, 112, 91, 49, 222, 59, 147, 62, 243, 248, 63, 124, 39, 198,
  40, 174, 10, 160, 132, 152, 153, 144, 32, 145, 236, 231, 68, 191, 131, 117, 81, 83, 241, 199, 214, 66, 234, 64, 54, 8,
  22, 205, 135, 150, 239, 247, 207, 84, 21, 184, 100, 162, 106, 57, 158, 209, 250, 105, 120, 225, 52, 175, 85, 97, 103,
  80, 255, 142, 34, 101, 252, 186, 44, 137, 14, 74, 23, 111, 139, 93, 17, 76, 180, 228, 7, 29, 42, 133, 206, 5, 154,
  134, 65, 242, 99, 238, 202, 87, 75, 229, 45, 185, 115, 188, 217, 141, 78, 204, 28, 181, 56, 151, 30, 167, 244, 90, 88,
  245, 208, 215, 127, 254, 193, 114, 143, 113, 173, 53, 129, 176, 125, 15, 51, 96, 232, 98, 6, 11, 2, 55, 38, 0, 25, 89,
  201, 157, 4, 227, 48, 221, 200, 170, 166, 168, 130, 237, 82, 94, 197, 95, 183, 149, 110, 61, 31, 171, 210,
];

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
