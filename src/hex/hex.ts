import { LOOKUP_HEX } from "./const";

export function arrayBufferToHex(ab: ArrayBuffer): string {
  const dataView = new Uint8Array(ab);
  const len = dataView.length;
  const hexOctets = new Array(len);

  let i = len;
  while (i--) {
    hexOctets[i] = LOOKUP_HEX[dataView[i]];
  }

  return hexOctets.join("");
}

export function hexToArrayBuffer(hex: string): ArrayBuffer {
  let len = hex.length;
  if (len % 2 !== 0) {
    throw new Error("not valid hex length! len:" + len.toString(10));
  }

  let j = len - 1; // set hex length
  len = len / 2; // 1 Bytes holds 2 hex values
  const dataView = new Uint8Array(len);

  let i = len;
  while (i--) {
    dataView[i] = parseInt(hex[j - 1] + hex[j], 16);
    j -= 2;
  }

  return dataView.buffer;
}
