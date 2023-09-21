import { randomMat, randomVec } from "./matrix";

type Layer = {
  weights: number[][];
  biases: number[];
};

export const buildNn = (numLayers: number[]): Layer[] | void => {
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
