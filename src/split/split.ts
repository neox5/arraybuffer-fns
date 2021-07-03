export function splitArrayBufferAt(buf: ArrayBuffer, index: number): { buf1: ArrayBuffer; buf2: ArrayBuffer } {
  if (index > buf.byteLength) {
    throw new Error(`index exceeds ArrayBuffer! lenght: ${buf.byteLength}, index: ${index}`);
  }

  return {
    buf1: buf.slice(0, index),
    buf2: buf.slice(index),
  };
}
