import { Base64 } from "../model/base64";
import { B64_SET, LOOKUP_BASE64 } from "./const";

//           +-------+-------+-------+
// Bytes     |   8   |   8   |   8   |    8 Bits per Byte
//           +-------+-------+-------+
//           +-----+-----+-----+-----+
// Base64    |  6  |  6  |  6  |  6  |    6 Bits per Character
//           +-----+-----+-----+-----+

// tslint:disable:no-bitwise
// ArrayBuffer to Base64
export function arrayBufferToBase64(ab: ArrayBuffer): Base64 {
  const bytes = new Uint8Array(ab);
  const lenBytes = bytes.length;
  const remainder = lenBytes % 3;
  const fixedLen = lenBytes - remainder;
  let len64 = (fixedLen * 4) / 3;
  if (remainder !== 0) {
    len64 += 4; // with padding
  }

  const b64 = new Array(len64); // base64 string[]

  let chunk: number;

  let i = 0; // byte counter
  let j = 0; // b64 counter
  while (i < fixedLen) {
    chunk = (bytes[i++] << 16) | (bytes[i++] << 8) | bytes[i++];

    b64[j++] = B64_SET[(chunk & 0xfc0000) >> 18]; // 16515072 = (2^6 - 1) << 18
    b64[j++] = B64_SET[(chunk & 0x3f000) >> 12]; // 258048   = (2^6 - 1) << 12
    b64[j++] = B64_SET[(chunk & 0xfc0) >> 6]; // 4032     = (2^6 - 1) << 6
    b64[j++] = B64_SET[chunk & 0x3f]; // 63       = 2^6 - 1
  }

  if (remainder === 1) {
    chunk = bytes[i];

    b64[j++] = B64_SET[(chunk & 0xfc) >> 2]; // 252 = (2^6 - 1) << 2
    b64[j++] = B64_SET[(chunk & 0x3) << 4]; // 3   = 2^2 - 1
    b64[j++] = "=";
    b64[j++] = "=";
  } else if (remainder === 2) {
    chunk = (bytes[i] << 8) | bytes[i + 1];

    b64[j++] = B64_SET[(chunk & 0xfc00) >> 10]; // 64512 = (2^6 - 1) << 10
    b64[j++] = B64_SET[(chunk & 0x3f0) >> 4]; // 1008  = (2^6 - 1) << 4
    b64[j++] = B64_SET[(chunk & 0xf) << 2]; // 15    = 2^4 - 1
    b64[j++] = "=";
  }

  return b64.join("");
}

//           +-----+-----+-----+-----+
// Base64    |  6  |  6  |  6  |  6  |    6 Bits per Character
//           +-----+-----+-----+-----+
//           +-------+-------+-------+
// Bytes     |   8   |   8   |   8   |    8 Bits per Byte
//           +-------+-------+-------+

// Base64 to ArrayBuffer
export function base64ToArrayBuffer(b64: Base64): ArrayBuffer {
  if (!validatedBase64(b64)) {
    throw new Error("not a valid base64 string: " + b64);
  }

  const len64 = b64.length;
  const fixLength = len64; // last 4 char for separate decoding
  let bufLen = len64 * 0.75;

  if (b64[len64 - 1] === "=") {
    bufLen--;
    if (b64[len64 - 2] === "=") {
      bufLen--;
    }
  }

  const ab = new ArrayBuffer(bufLen); // final ArrayBuffer
  const bytes = new Uint8Array(ab); // DataView
  // IMPORTANT:
  // when DataView is exceeded the assignments are not written to the underlying ArrayBuffer

  let i = 0; // b64 counter
  let j = 0; // byte counter
  let enc1: number;
  let enc2: number;
  let enc3: number;
  let enc4: number;
  while (i < fixLength) {
    enc1 = LOOKUP_BASE64[b64.charCodeAt(i++)];
    enc2 = LOOKUP_BASE64[b64.charCodeAt(i++)];
    enc3 = LOOKUP_BASE64[b64.charCodeAt(i++)];
    enc4 = LOOKUP_BASE64[b64.charCodeAt(i++)];

    bytes[j++] = (enc1 << 2) | (enc2 >> 4); // enc2 bits need no bit masking
    bytes[j++] = ((enc2 & 0xf) << 4) | (enc3 >> 2);
    bytes[j++] = ((enc3 & 0x3) << 6) | enc4;
  }

  return bytes;
}

export function validatedBase64(b64: Base64): boolean {
  const regex = /^[A-Za-z0-9\+\/]+={0,2}$/; /* eslint-disable-line no-useless-escape */

  if (!regex.test(b64)) {
    return false;
  }

  if (b64.length % 4 !== 0) {
    return false;
  }
  return true;
}

// tslint:enable:no-bitwise
