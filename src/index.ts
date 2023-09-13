import { Matrix, Vector } from "./utils";

function main() {
  const m = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  m.T.show();
}

main();
