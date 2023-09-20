import { matMul, transpose, zero } from "./matrix";
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
  console.time("class");
  let res;
  for (let i = 0; i < 1000000; i++) res = Matrix.multiply(m1, m2);
  console.timeEnd("class");
  if (res) {
    res.show();
  }
  console.log("=====================");
  const z = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
  ];
  console.log(z);
  console.log(".................");
  console.log(transpose(z));
  console.log("========================");

  const m11 = [
    [1, 0, 1],
    [2, 1, 1],
    [0, 1, 1],
    [1, 1, 2],
  ];
  const m12 = [
    [1, 2, 1],
    [2, 3, 1],
    [4, 2, 2],
  ];

  console.time("func");
  for (let i = 0; i < 10000000; i++) res = matMul(m11, m12);
  console.timeEnd("func");
  console.log(res);
}

main();
