const enc = new TextEncoder();
const dec = new TextDecoder();

export function stringToArrayBuffer(str: string): ArrayBuffer {
  return enc.encode(str);
}

export function arrayBufferToString(buf: ArrayBuffer): string {
  return dec.decode(buf);
}
