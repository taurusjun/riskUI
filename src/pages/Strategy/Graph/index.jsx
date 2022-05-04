import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import Graphin, { Utils, GraphinTreeData } from '@antv/graphin';
import { Row, Col } from 'antd';

const StrategyGraph = () => {
  const strategyNodesEdges = {
    start_node_001: [
      {
        fromNode: {
          uuid: 'f049ff84-a3af-11ec-b909-0242ac120002',
          code: 'start_node_001',
          description: '',
          type: 'start',
          strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
        },
        toNode: {
          uuid: '82d63dad-d7d7-4c55-a7c6-211cfc4e67a6',
          code: 'common_node_001',
          description: '',
          type: 'common',
          strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
        },
        logic: 'Any',
      },
    ],
    common_node_001: [
      {
        fromNode: {
          uuid: '82d63dad-d7d7-4c55-a7c6-211cfc4e67a6',
          code: 'common_node_001',
          description: '',
          type: 'common',
          strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
        },
        toNode: {
          uuid: '176fc355-cb91-4797-9c39-71ce04f1e75d',
          code: 'start_node_003',
          description: '',
          type: 'start',
          strategyUuid: '952cc300-a696-4829-bb7a-3e3c9b4d83eb',
        },
        logic: 'Y',
      },
      {
        fromNode: {
          uuid: '82d63dad-d7d7-4c55-a7c6-211cfc4e67a6',
          code: 'common_node_001',
          description: '',
          type: 'common',
          strategyUuid: 'd68c07d6-a3af-11ec-b909-0242ac120002',
        },
        toNode: {
          uuid: '62f420fb-02e7-47c7-803a-6f4b51f34c01',
          code: 'start_node_002',
          description: '',
          type: 'start',
          strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
        },
        logic: 'N',
      },
    ],
    result_node_001: [],
    start_node_002: [
      {
        fromNode: {
          uuid: '62f420fb-02e7-47c7-803a-6f4b51f34c01',
          code: 'start_node_002',
          description: '',
          type: 'start',
          strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
        },
        toNode: {
          uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
          code: 'common_node_002',
          description: '',
          type: 'common',
          strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
        },
        logic: 'Any',
      },
    ],
    common_node_002: [
      {
        fromNode: {
          uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
          code: 'common_node_002',
          description: '',
          type: 'common',
          strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
        },
        toNode: {
          uuid: 'e289d258-4a07-404a-b65e-3ca99ab6513c',
          code: 'result_node_0021',
          description: '',
          type: 'result',
          strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
        },
        logic: 'Y',
      },
      {
        fromNode: {
          uuid: '8bce9a9a-e6ce-4cd6-8bbc-1057f6f3ffdf',
          code: 'common_node_002',
          description: '',
          type: 'common',
          strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
        },
        toNode: {
          uuid: '48768ba8-e1a3-4558-a0b0-a7fc7a7e0923',
          code: 'result_node_0022',
          description: '',
          type: 'result',
          strategyUuid: 'dc564013-5f16-4ff6-84ed-41f56c1bcaed',
        },
        logic: 'N',
      },
    ],
    result_node_0021: [],
    result_node_0022: [],
    start_node_003: [],
  };

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

  const nodes = [
    {
      id: 'start_node_001',
    },
    {
      id: 'common_node_001',
    },
    {
      id: 'common_node_0011',
    },
    {
      id: 'result_node_001',
    },
    {
      id: 'start_node_002',
    },
    {
      id: 'common_node_002',
    },
    {
      id: 'result_node_0021',
    },
    {
      id: 'result_node_0022',
    },
  ];

  const edges = [
    {
      source: 'start_node_001',
      target: 'common_node_0011',
      style: {
        label: {
          value: 'Any',
        },
      },
    },
    {
      source: 'common_node_0011',
      target: 'result_node_001',
      style: {
        label: {
          value: 'Yes',
        },
        keyshape: {
          lineDash: [4, 4],
        },
      },
    },
    {
      source: 'common_node_0011',
      target: 'start_node_002',
      style: {
        label: {
          value: 'No',
        },
        keyshape: {
          lineDash: [4, 4],
          stroke: 'red',
        },
      },
    },
    {
      source: 'start_node_001',
      target: 'common_node_001',
      style: {
        label: {
          value: 'Any',
        },
      },
    },
    {
      source: 'common_node_001',
      target: 'result_node_001',
      style: {
        label: {
          value: 'Yes',
        },
        keyshape: {
          lineDash: [4, 4],
        },
      },
    },
    {
      source: 'common_node_001',
      target: 'start_node_002',
      style: {
        label: {
          value: 'No',
        },
        keyshape: {
          lineDash: [4, 4],
          stroke: 'red',
        },
      },
    },
    {
      source: 'start_node_002',
      target: 'common_node_002',
      style: {
        label: {
          value: 'Any',
        },
      },
    },
    {
      source: 'common_node_002',
      target: 'result_node_0021',
      style: {
        label: {
          value: 'Yes',
        },
        keyshape: {
          lineDash: [4, 4],
        },
      },
    },
    {
      source: 'common_node_002',
      target: 'result_node_0022',
      style: {
        label: {
          value: 'No',
        },
        keyshape: {
          lineDash: [4, 4],
          stroke: 'red',
        },
      },
    },
  ];

  nodes.map((node, index) => {
    node.style = {
      label: {
        value: node.id,
      },
      type: 'graphin-circle',
    };
  });

  edges.map((edge, index) => {
    var egdeStyle = edge.style;
  });

  const data2 = { nodes, edges };
  console.log(data2);

  const data = { nodes: nodeList, edges: nodeEdges };
  console.log(data);

  return (
    <div>
      <Row gutter={8}>
        <Col span={2}>
          <div>StrategyGraph</div>
        </Col>
        <Col span={22}>
          <Graphin
            fitView={true}
            fitCenter={true}
            data={data}
            layout={{ type: 'dagre', rankdir: 'LR' }}
            // layout={{ type: 'compactBox' }}
            // layout={{ type: 'concentric' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default StrategyGraph;
