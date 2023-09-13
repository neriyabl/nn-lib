import { Matrix, Vector } from "./utils";

function main() {
  const m1 = Matrix.fromArray([
    [1, 0, 1],
    [2, 1, 1],
    [0, 1, 1],
    [1, 1, 2],
  ]);

  const m2 = Matrix.fromArray([
    [1, 2, 1],
    [2, 3, 1],
    [4, 2, 2],
  ]);

  m1.show();
  console.log("--------");
  m2.show();

  console.log("m1 * m2");
  const res = Matrix.multiply(m1, m2);
  if (res) {
    res.show();
  }
}

main();
