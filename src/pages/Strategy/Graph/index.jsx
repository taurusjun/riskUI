import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import Graphin, { Utils, GraphinTreeData } from '@antv/graphin';
import { Row, Col, Spin } from 'antd';
import { strategyNodeGraph } from '../service';
import { useRequest } from 'umi';

const StrategyGraph = () => {
  const { error, loading, run, data: data } = useRequest(() => strategyNodeGraph());

  //Strategy node edges
  const strategyNodesEdges = loading ? {} : data.strategyNodeGraph.connectVOMap;
  //Strategy node detail Map, key is strategy node code
  const strategyNodeMap = loading ? {} : new Map(Object.entries(data.strategyNodeMap));

  let graphData = {};

  if (!loading) {
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

    graphData = { nodes: nodeList, edges: nodeEdges };
  }

  console.log(graphData);

  // const nodes = [
  //   {
  //     id: 'start_node_001',
  //   },
  //   {
  //     id: 'common_node_001',
  //   },
  //   {
  //     id: 'common_node_0011',
  //   },
  //   {
  //     id: 'result_node_001',
  //   },
  //   {
  //     id: 'start_node_002',
  //   },
  //   {
  //     id: 'common_node_002',
  //   },
  //   {
  //     id: 'result_node_0021',
  //   },
  //   {
  //     id: 'result_node_0022',
  //   },
  // ];

  // const edges = [
  //   {
  //     source: 'start_node_001',
  //     target: 'common_node_0011',
  //     style: {
  //       label: {
  //         value: 'Any',
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_0011',
  //     target: 'result_node_001',
  //     style: {
  //       label: {
  //         value: 'Yes',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_0011',
  //     target: 'start_node_002',
  //     style: {
  //       label: {
  //         value: 'No',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //         stroke: 'red',
  //       },
  //     },
  //   },
  //   {
  //     source: 'start_node_001',
  //     target: 'common_node_001',
  //     style: {
  //       label: {
  //         value: 'Any',
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_001',
  //     target: 'result_node_001',
  //     style: {
  //       label: {
  //         value: 'Yes',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_001',
  //     target: 'start_node_002',
  //     style: {
  //       label: {
  //         value: 'No',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //         stroke: 'red',
  //       },
  //     },
  //   },
  //   {
  //     source: 'start_node_002',
  //     target: 'common_node_002',
  //     style: {
  //       label: {
  //         value: 'Any',
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_002',
  //     target: 'result_node_0021',
  //     style: {
  //       label: {
  //         value: 'Yes',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //       },
  //     },
  //   },
  //   {
  //     source: 'common_node_002',
  //     target: 'result_node_0022',
  //     style: {
  //       label: {
  //         value: 'No',
  //       },
  //       keyshape: {
  //         lineDash: [4, 4],
  //         stroke: 'red',
  //       },
  //     },
  //   },
  // ];

  // nodes.map((node, index) => {
  //   node.style = {
  //     label: {
  //       value: node.id,
  //     },
  //     type: 'graphin-circle',
  //   };
  // });

  // edges.map((edge, index) => {
  //   var egdeStyle = edge.style;
  // });

  // const data2 = { nodes, edges };
  // console.log(data2);

  return (
    <Spin spinning={loading} size="large" delay={300}>
      {!loading && (
        <>
          <div>
            <Row gutter={8}>
              <Col span={2}>
                <div>StrategyGraph</div>
              </Col>
              <Col span={22}>
                <Graphin
                  fitView={true}
                  fitCenter={true}
                  data={graphData}
                  layout={{ type: 'dagre', rankdir: 'LR' }}
                  // layout={{ type: 'compactBox' }}
                  // layout={{ type: 'concentric' }}
                />
              </Col>
            </Row>
          </div>
        </>
      )}
    </Spin>
  );
};

export default StrategyGraph;
