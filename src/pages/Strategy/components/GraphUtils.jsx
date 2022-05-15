import { now } from 'lodash';
import { Util } from '@antv/g6';

const subjectColors = [
  '#3D76DD',
  '#19A576',
  '#65789B',
  '#B98700',
  '#5349E0',
  '#5AB8DB',
  '#7B48A1',
  '#D77622',
  '#008685',
  '#D37099',
];
const darkBackColor = 'rgb(43, 47, 51)';
const disableColor = '#777';
const theme = 'dark';

export const colorSets = Util.getColorSetsBySubjectColors(
  subjectColors,
  darkBackColor,
  theme,
  disableColor,
);

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
