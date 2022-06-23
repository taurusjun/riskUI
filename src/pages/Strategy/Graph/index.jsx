import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import Graphin, { IG6GraphEvent, Utils, GraphinData, GraphinContext } from '@antv/graphin';
import { Row, Col, Spin, message } from 'antd';
import { strategyNodeGraph } from '../service';
import { useRequest } from 'umi';
import { useContext, useEffect } from 'react';
import { convertEdges2Graph } from '../components/GraphUtils';
import { colorSets } from '../components/GraphUtils';
import '../components/graphinRegisterShape';
import '../components/graphinEvents';
import { StrategyGraphBehavior } from '../components';

const StrategyGraph = () => {
  const { error, loading, run, data: data } = useRequest(() => strategyNodeGraph());

  //Strategy node edges
  const strategyNodesEdges = loading ? {} : data.strategyNodeGraph.connectVOMap;
  //Strategy node detail Map, key is strategy node code
  const strategyNodeMap = loading ? {} : new Map(Object.entries(data.strategyNodeMap));

  let graphData = {};

  if (!loading) {
    graphData = convertEdges2Graph(strategyNodesEdges);
  }

  console.log(graphData);

  /////////   test data -start ////////
  // const loading = false;
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

  // nodes.forEach((node) => {
  //   node.type = 'myshape';
  //   node.label = node.id;
  //   node.style = {
  //     stroke: '#72CC4A',
  //     width: 150,
  //   };
  // });

  // nodes.map((node, index) => {
  //   node.style = {
  //     keyshape: {
  //       stroke: 'red',
  //       // fill: 'red',
  //     },
  //     label: {
  //       value: node.id,
  //       fill: 'blue',
  //     },
  //     type: 'graphin-circle',
  //   };
  // });

  // edges.map((edge, index) => {
  //   var egdeStyle = edge.style;
  // });

  // graphData = { nodes, edges };
  // console.log(graphData);
  /////////   test data -end ////////

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
                  // modes={{ default: ['sampleBehavior', 'drag-node', 'click-select'] }}
                >
                  <StrategyGraphBehavior />
                </Graphin>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Spin>
  );
};

export default StrategyGraph;
