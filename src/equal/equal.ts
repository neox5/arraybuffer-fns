export function equal(abA: ArrayBuffer, abB: ArrayBuffer): boolean {
  const viewA = new Uint8Array(abA);
  const viewB = new Uint8Array(abB);

  if (viewA.length !== viewB.length) {
    return false;
  }

  let i = viewA.length;
  while (i--) {
    if (viewA[i] !== viewB[i]) {
      return false;
    }
  }
  return true;
}
