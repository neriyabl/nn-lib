import { buildNn, predict } from "./ann";
import { matMul, matSum, transpose } from "./matrix";
import { Matrix } from "./utils";

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
  for (let i = 0; i < 100000; i++) res = Matrix.multiply(m1, m2);
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
  for (let i = 0; i < 100000; i++) res = matMul(m11, m12);
  console.timeEnd("func");
  console.log(res);

  console.log();
  console.log();
  console.log();

  const m21 = [
    [1, 2, 3],
    [1, 2, 3],
  ];

  const m22 = [
    [1, 1, 1],
    [3, 2, 1],
  ];

  console.log(matSum(m21, m22));

  console.log("+++++++++++++++++++++++++++++++++");
  const nn = buildNn([10, 5, 5, 2]);
  // console.log(JSON.stringify(nn, null, 2));

  console.log("predict ...................");
  if (nn) {
    console.log(
      predict(
        nn,
        [0.2, 0.4, 0.11, 0.0234, 0.234, 0.11, 0.003, 0.11, 0.0054, 0.52257]
      )
    );
  }
}

main();
