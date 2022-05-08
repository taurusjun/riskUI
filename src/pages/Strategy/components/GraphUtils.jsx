import { now } from 'lodash';

export const convertEdges2Graph = (strategyNodesEdges) => {
  const nodeMap = new Map(Object.entries(strategyNodesEdges));
  const nodeList = nodeMap.keys().reduce(
    (ac, item) => [
      ...ac,
      {
        id: item,
        style: {
          label: {
            value: item,
          },
          type: 'graphin-circle',
        },
      },
    ],
    [],
  );

  const nodeConnectionArray = nodeMap.reduce((arr, val) => [...arr, ...val], []);
  const nodeEdges = nodeConnectionArray.reduce((arr, item) => {
    let color = 'black'; //default color
    if (item.logic == 'N') color = 'red';
    if (item.logic == 'Y') color = 'blue';

    let temp = [
      ...arr,
      {
        source: item.fromNode.code,
        target: item.toNode.code,
        style: {
          label: {
            value: item.logic,
          },
          keyshape: {
            lineDash: [4, 4],
            stroke: color,
          },
        },
      },
    ];
    return temp;
  }, []);

  return { nodes: nodeList, edges: nodeEdges };
};
