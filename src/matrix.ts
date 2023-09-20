export const zero = (m: number, n: number) => {
  return Array(m)
    .fill(0)
    .map((_) => Array(n).fill(0));
};

export const transpose = (mat: number[][]): number[][] => {
  if (mat.length === 0) {
    return [];
  }
  const n = mat.length;
  const m = mat[0].length;
  const res: number[][] = zero(m, n);
  for (let i = 0; i < n * m; i++) {
    res[Math.floor(i / n)][i % n] = mat[i % n][Math.floor(i / n)];
  }
  return res;
};

export const dotProd = (v1: number[], v2: number[]): number => {
  if (v1.length !== v2.length) return NaN;
  let res = 0;
  for (let i = 0; i < v1.length; i++) {
    res += v1[i] * v2[i];
  }
  return res;
};

export const matMul = (m1: number[][], m2: number[][]): number[][] => {
  if (m1.length === 0 || m2.length === 0 || m1[0].length !== m2.length) {
    throw Error("Not valid length");
  }

  const m2t = transpose(m2);
  const res = [];
  for (const row of m1) {
    const v = [];
    for (const col of m2t) {
      v.push(dotProd(row, col));
    }
    res.push(v);
  }
  return res;
};
