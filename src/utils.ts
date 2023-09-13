export class Vector implements Iterable<number> {
  #vec: number[] = [];
  constructor(arr: number[]) {
    this.#vec = [...arr];
  }

  scale(num: number): void {
    this.#vec = this.#vec.map((val) => val * num);
  }

  get len(): number {
    return this.#vec.length;
  }

  at(idx: number) {
    if (!Number.isInteger(idx)) {
      return NaN;
    }
    return this.#vec[idx];
  }

  show() {
    console.log(this.#vec);
  }

  *[Symbol.iterator](): IterableIterator<number> {
    for (const num of this.#vec) {
      yield num;
    }
  }

  static dotProduct(a: Vector, b: Vector): number {
    if (a.len !== b.len) return NaN;
    let res = 0;
    for (let i = 0; i < a.len; i++) {
      res += a.#vec[i] * b.#vec[i];
    }
    return res;
  }
}

export class Matrix {
  #mat: Vector[] = [];
  #t?: Matrix;

  static fromArray(arr: Array<number>[]): Matrix {
    const mat = new Matrix();
    for (const v of arr) {
      mat.pushRow(new Vector(v));
    }
    return mat;
  }

  pushRow(row: Vector) {
    if (this.#mat.length > 0 && row.len !== this.#mat[0].len) {
      throw new Error("Can't add row with different number of columns'");
    }
    this.#mat.push(row);
    this.#t = undefined;
  }

  get T(): Matrix {
    if (!this.#t) {
      this.#t = new Matrix();
      for (let i = 0; i < this.#mat[0].len; i++) {
        const row = this.#mat.map((v) => v.at(i));
        this.#t.pushRow(new Vector(row));
      }
    }
    return this.#t;
  }

  static multiply(a: Matrix, b: Matrix): Matrix | void {
    if (a.#mat.length <= 0 || a.#mat[0].len !== b.#mat.length) return;
    const res = new Matrix();
    for (const row of a.#mat) {
      const v = [];
      for (const col of b.T.#mat) {
        v.push(Vector.dotProduct(row, col));
      }
      res.pushRow(new Vector(v));
    }
    return res;
  }

  show() {
    for (const i of this.#mat) {
      i.show();
    }
  }
}
