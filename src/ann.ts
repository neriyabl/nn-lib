import {
  matMul,
  matSum,
  randomMat,
  randomVec,
  transpose,
  vecDiff,
} from "./matrix";

type Layer = {
  weights: number[][];
  biases: number[];
};

type Ann = Layer[];

const softmax = (vec: number[]): number[] =>
  vec.map(
    (val) =>
      Math.exp(val) / vec.map((val) => Math.exp(val)).reduce((a, b) => a + b)
  );

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
  return softmax(transpose(annRes)[0]);
};

const backpropagation = (ann: Ann, outputError: number[]) => {
  let error = outputError;
  for (let i = ann.length - 1; i >= 0; i++) {
    // TODO continue from here
  }
};

export const train = (ann: Ann, inputs: number[][], outputs: number[][]) => {
  if (inputs.length !== outputs.length) {
    throw Error("Missing inputs or outputs");
  }

  for (let i = 0; i < inputs.length; i++) {
    try {
      const predicted = predict(ann, inputs[i]);
      //calculate Error
      const error = vecDiff(outputs[i], predicted);
      //backpropagation change ann inplace
      backpropagation(ann, error);
    } catch (e) {}
  }
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
