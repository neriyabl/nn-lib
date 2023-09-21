import { matMul, matSum, randomMat, randomVec, transpose } from "./matrix";

type Layer = {
  weights: number[][];
  biases: number[];
};

type Ann = Layer[];

export const buildNn = (numLayers: number[]): Ann | void => {
  if (numLayers.length < 2) {
    return;
  }
  const res: Layer[] = [];
  let n = numLayers[0];
  for (const layerSize of numLayers.slice(1)) {
    const layer: Layer = {
      weights: randomMat(layerSize, n),
      biases: randomVec(layerSize),
    };
    res.push(layer);
    n = layerSize;
  }
  return res;
};

export const predict = (ann: Ann, inputs: number[]): number[] => {
  if (ann?.[0]?.weights?.[0]?.length !== inputs.length) {
    return [];
  }
  let annRes = transpose([inputs]);
  for (const layer of ann) {
    // W*i+b
    const mul = matMul(layer.weights, annRes);
    const sum = matSum(mul, transpose([layer.biases]));
    // activation relU
    annRes = sum.map((row) => row.map((v) => Math.max(0, v)));
  }
  return transpose(annRes)[0];
};

/*
in 8, 4, 4, 2

[
  { 1
    weights : [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0]
    ],
    biases: [0,0,0,0]
  },
  { 2
    weights: [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    biases: [0,0,0,0]
  },
  { 3
    weights: [
      [0,0,0,0],
      [0,0,0,0],
    ],
    biases: [0,0]
  }
]

*/
