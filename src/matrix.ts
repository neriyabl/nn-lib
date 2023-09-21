export const zeroMat = (m: number, n: number): number[][] => {
  return Array(m)
    .fill(0)
    .map((_) => Array(n).fill(0));
};

export const randomMat = (m: number, n: number): number[][] => {
  return Array(m)
    .fill(0)
    .map((_) =>
      Array(n)
        .fill(0)
        .map((_) => Math.random() * 2 - 1)
    );
};

export const randomVec = (n: number) => {
  return Array(n)
    .fill(0)
    .map((_) => Math.random() * 2 - 1);
};

export const dotProd = (v1: number[], v2: number[]): number => {
  if (v1.length !== v2.length) return NaN;
  let res = 0;
  for (let i = 0; i < v1.length; i++) {
    res += v1[i] * v2[i];
  }
  return res;
};

export const vecSum = (v1: number[], v2: number[]): number[] => {
  if (v1.length !== v2.length) {
    throw Error("vectors not in same length");
  }
  return v1.map((value, idx) => value + v2[idx]);
};

export const vecDiff = (v1: number[], v2: number[]): number[] => {
  if (v1.length !== v2.length) {
    throw Error("vectors not in same length");
  }
  return v1.map((value, idx) => value - v2[idx]);
};

export const transpose = (mat: number[][]): number[][] => {
  if (mat.length === 0) {
    return [];
  }
  const n = mat.length;
  const m = mat[0].length;
  const res = zeroMat(m, n);
  for (let i = 0; i < n * m; i++) {
    res[Math.floor(i / n)][i % n] = mat[i % n][Math.floor(i / n)];
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

export const matSum = (m1: number[][], m2: number[][]) => {
  if (
    !m1.length ||
    !m2.length ||
    m1.length !== m2.length ||
    m1[0].length !== m2[0].length
  ) {
    throw Error("length not match");
  }
  const m = m1.length;
  const n = m1[0].length;

  return m1.map((v1, rowIdx) => vecSum(v1, m2[rowIdx]));
};
